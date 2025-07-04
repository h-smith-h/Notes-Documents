import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: number;
  read: number;
}

interface MessageListProps {
  contactId: string;
  onBack: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ contactId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newMessage })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add the new message to the UI
        setMessages(prev => [...prev, data.messageData]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages on component mount and periodically
  useEffect(() => {
    fetchMessages();
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      className="messages-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="messages-header">
        <div className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="contact-info">
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="contact-name">Joseph</div>
        </div>
      </div>
      
      <div className="messages-list">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map(message => (
                <motion.div 
                  key={message.id}
                  className={`message ${message.sender === 'Hannah' ? 'sent' : 'received'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <form className="message-input" onSubmit={sendMessage}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} className="icon" />
        </button>
      </form>
    </motion.div>
  );
};

export default MessageList;