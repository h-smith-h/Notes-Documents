# Hannah's Messaging App

A beautiful messaging application with a purple and black theme that allows Hannah to message Joseph. Messages are forwarded to Joseph's phone number.

## Features

- Beautiful purple and black UI
- Snake-like loading animation (7 seconds)
- "Welcome Hannah" animation with purple font
- Messaging interface with contact selection
- Messages from Hannah are forwarded to Joseph's phone
- Joseph can reply through a password-protected web interface (password: 4026)

## Deployment Instructions for Railway

1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Configure the following environment variables:
   - `PORT`: 3000
   - `EMAIL_USER`: Your email address for sending SMS notifications
   - `EMAIL_PASS`: Your email app password
   - `API_KEY`: 4026 (password for Joseph's interface)

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=3001
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   API_KEY=4026
   ```

4. Start the development server:
   ```bash
   npm run start
   ```

5. Open your browser and navigate to:
   - Hannah's interface: http://localhost:5173
   - Joseph's interface: http://localhost:3001

## Project Structure

- `/src`: Frontend React application (Hannah's interface)
- `/server`: Backend Express server
  - `/server/public`: Joseph's web interface
  - `/server/server.js`: Main server file
  - `/server/messages.db`: SQLite database for message storage

## Technologies Used

- Frontend:
  - React with TypeScript
  - SCSS for styling
  - Framer Motion for animations
  - FontAwesome for icons

- Backend:
  - Express.js
  - SQLite for database
  - Nodemailer for email-to-SMS gateway

## Mobile Optimization

The application is fully responsive and optimized for mobile devices, with special attention to touch interactions and mobile-friendly UI elements.
