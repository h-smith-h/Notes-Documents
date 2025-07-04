const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Joseph's interface routes (specific routes first)
app.get('/joseph/desktop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/joseph', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mobile.html'));
});

// Serve Joseph's static files
app.use('/joseph', express.static(path.join(__dirname, 'public')));

// Serve built React app (after Joseph routes)
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'messages.db'));

// Create messages table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      sender TEXT NOT NULL,
      recipient TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      read INTEGER DEFAULT 0
    )
  `);
});

// Email configuration for Straight Talk SMS gateway
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint to send a message from Hannah to Joseph (via SMS)
app.post('/api/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const sender = 'Hannah';
    const recipient = 'Joseph';
    
    // The phone number is hidden from the frontend
    const phoneNumber = '8146610359';
    
    // Format for Straight Talk email-to-SMS gateway
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${phoneNumber}@vtext.com`, // Straight Talk SMS gateway
      subject: `New message from ${sender}`,
      text: message
    };

    // Store message in database
    const messageId = uuidv4();
    const timestamp = Date.now();
    
    db.run(
      'INSERT INTO messages (id, content, sender, recipient, timestamp, read) VALUES (?, ?, ?, ?, ?, ?)',
      [messageId, message, sender, recipient, timestamp, 0],
      async (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ success: false, message: 'Failed to save message' });
        }
        
        // Send email to SMS gateway
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully',
            messageData: {
              id: messageId,
              content: message,
              sender,
              recipient,
              timestamp,
              read: 0
            }
          });
        } catch (emailError) {
          console.error('Email error:', emailError);
          res.status(200).json({ 
            success: true, 
            message: 'Message saved but SMS notification failed',
            messageData: {
              id: messageId,
              content: message,
              sender,
              recipient,
              timestamp,
              read: 0
            }
          });
        }
      }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Failed to process message' });
  }
});

// Endpoint for Joseph to send a message back to Hannah (via web UI)
app.post('/api/reply', (req, res) => {
  try {
    const { message, apiKey } = req.body;
    
    // Simple API key validation (you should use a more secure method in production)
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const sender = 'Joseph';
    const recipient = 'Hannah';
    const messageId = uuidv4();
    const timestamp = Date.now();
    
    db.run(
      'INSERT INTO messages (id, content, sender, recipient, timestamp, read) VALUES (?, ?, ?, ?, ?, ?)',
      [messageId, message, sender, recipient, timestamp, 0],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ success: false, message: 'Failed to save message' });
        }
        
        res.status(200).json({ 
          success: true, 
          message: 'Reply sent successfully',
          messageData: {
            id: messageId,
            content: message,
            sender,
            recipient,
            timestamp,
            read: 0
          }
        });
      }
    );
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ success: false, message: 'Failed to process reply' });
  }
});

// Endpoint to get all messages for a conversation
app.get('/api/messages', (req, res) => {
  db.all(
    'SELECT * FROM messages WHERE (sender = ? AND recipient = ?) OR (sender = ? AND recipient = ?) ORDER BY timestamp ASC',
    ['Hannah', 'Joseph', 'Joseph', 'Hannah'],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Failed to retrieve messages' });
      }
      
      res.status(200).json({ success: true, messages: rows });
    }
  );
});

// Mark messages as read
app.post('/api/mark-read', (req, res) => {
  const { messageIds } = req.body;
  
  if (!Array.isArray(messageIds) || messageIds.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid message IDs' });
  }
  
  const placeholders = messageIds.map(() => '?').join(',');
  
  db.run(
    `UPDATE messages SET read = 1 WHERE id IN (${placeholders})`,
    messageIds,
    (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Failed to mark messages as read' });
      }
      
      res.status(200).json({ success: true, message: 'Messages marked as read' });
    }
  );
});



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});