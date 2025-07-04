# Hannah's Messaging App

A beautiful messaging application with a purple and black theme that allows Hannah to message Joseph. Messages are forwarded to Joseph's phone number.

## Features

- Beautiful purple and black UI
- Snake-like loading animation (7 seconds)
- "Welcome Hannah" animation with purple font
- Messaging interface with contact selection
- Messages from Hannah are forwarded to Joseph's phone
- Joseph can reply through a password-protected web interface (password: 4026)

## Deployment Instructions for Render.com

1. Create a new project on [Render](https://render.com/)
2. Connect your GitHub repository
3. Render will automatically detect the `render.yaml` file and configure the service
4. Configure the following environment variables in the Render dashboard:
   - `EMAIL_USER`: Your email address for sending SMS notifications (e.g., your Gmail address)
   - `EMAIL_PASS`: Your email app password (generate this from your email provider)
   - `API_KEY`: 4026 (password for Joseph's interface - already set in render.yaml)
   - `PORT`: Automatically managed by Render

### Accessing the Deployed App

Once deployed, you'll have access to:
- **Hannah's Interface**: Your main domain (e.g., https://your-app.onrender.com)
- **Joseph's Interface**: Your domain + `/joseph` (e.g., https://your-app.onrender.com/joseph)
- **Joseph's Desktop Interface**: Your domain + `/joseph/desktop` (e.g., https://your-app.onrender.com/joseph/desktop)

### Email Configuration for Straight Talk

The app is configured to send SMS notifications via email-to-SMS gateway to Straight Talk numbers using `@vtext.com`. Make sure your email credentials are properly configured in the environment variables.

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
   - Joseph's interface: http://localhost:3001/joseph

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
  - Nodemailer for email-to-SMS gateway (configured for Straight Talk)

## Mobile Optimization

The application is fully responsive and optimized for mobile devices, with special attention to touch interactions and mobile-friendly UI elements.
