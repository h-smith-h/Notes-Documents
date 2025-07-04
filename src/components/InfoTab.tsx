import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faCog } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const InfoTab: React.FC = () => {
  return (
    <motion.div 
      className="info-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="personal-message">
        <h2>Hey Hannah,</h2>
        <p>
          I am not in love with you like how you think I'm so in love with you. 
          I get why you took that from the note but Hannah I don't know what I truly feel 
          I just like being around you. In the simplest terms of everything I said that is all. 
          I enjoy simply being around you and smiling.
        </p>
        
        <div className="emoji-container">
          <div className="custom-missing-tooth-emoji">
            <svg width="80" height="80" viewBox="0 0 80 80" className="custom-emoji-svg">
              {/* Face circle with gradient */}
              <defs>
                <radialGradient id="faceGradient" cx="0.3" cy="0.3">
                  <stop offset="0%" stopColor="#ffed4e"/>
                  <stop offset="70%" stopColor="#ffdc00"/>
                  <stop offset="100%" stopColor="#f9c23c"/>
                </radialGradient>
                <radialGradient id="eyeGradient" cx="0.3" cy="0.3">
                  <stop offset="0%" stopColor="#333"/>
                  <stop offset="100%" stopColor="#000"/>
                </radialGradient>
              </defs>
              
              {/* Face */}
              <circle cx="40" cy="40" r="32" fill="url(#faceGradient)" stroke="#e6ac00" strokeWidth="1.5"/>
              
              {/* Eyes */}
              <ellipse cx="29" cy="30" rx="3.5" ry="5" fill="url(#eyeGradient)"/>
              <ellipse cx="51" cy="30" rx="3.5" ry="5" fill="url(#eyeGradient)"/>
              <ellipse cx="29.5" cy="28.5" rx="1" ry="1.5" fill="#fff" opacity="0.8"/>
              <ellipse cx="51.5" cy="28.5" rx="1" ry="1.5" fill="#fff" opacity="0.8"/>
              
              {/* Smile mouth opening */}
              <path d="M 26 46 Q 40 58 54 46 Q 40 54 26 46 Z" fill="#8b0000"/>
              
              {/* Upper lip */}
              <path d="M 26 46 Q 40 54 54 46" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              
              {/* Teeth - positioned along the smile curve */}
              <rect x="33" y="47" width="2.5" height="4" fill="#fffef7" rx="0.5" transform="rotate(-5 34 49)"/>
              <rect x="36.5" y="46.5" width="2.5" height="4.5" fill="#fffef7" rx="0.5"/>
              <rect x="40" y="46.2" width="2.5" height="5" fill="#fffef7" rx="0.5"/>
              <rect x="43.5" y="46.5" width="2.5" height="4.5" fill="#fffef7" rx="0.5"/>
              <rect x="47" y="47" width="2.5" height="4" fill="#fffef7" rx="0.5" transform="rotate(5 48 49)"/>
              
              {/* Missing tooth gap (left side) - just empty space */}
              {/* The gap is at position 29.5-32.5 where no tooth is drawn */}
              
              {/* Subtle cheek blush */}
              <ellipse cx="20" cy="42" rx="4" ry="3" fill="#ff9999" opacity="0.3"/>
              <ellipse cx="60" cy="42" rx="4" ry="3" fill="#ff9999" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="site-info">
        <h3><FontAwesomeIcon icon={faCog} className="icon" /> How BDG Notes Works</h3>
        
        <div className="info-section">
          <h4>📱 Messaging</h4>
          <p>You can send me messages anytime through the "Contacts" tab. Simply select my name and start typing!</p>
        </div>

        <div className="info-section">
          <h4>💬 Two-Way Communication</h4>
          <p>I can message you back through a special interface. Our conversations are saved here so you can always see our chat history.</p>
        </div>

        <div className="info-section">
          <h4><FontAwesomeIcon icon={faEyeSlash} className="icon" /> Privacy & Notifications</h4>
          <ul>
            <li><strong>No Push Notifications:</strong> This site won't send you any annoying notifications</li>
            <li><strong>Incognito Friendly:</strong> You can use this in private/incognito mode safely</li>
            <li><strong>Your Privacy:</strong> Only we can see our conversations</li>
          </ul>
        </div>

        <div className="info-section">
          <h4><FontAwesomeIcon icon={faLock} className="icon" /> Security</h4>
          <p>All messages are stored securely and privately. This is our own little space to communicate whenever you want to reach out.</p>
        </div>

        <div className="footer-note">
          <p><em>If you ever want to message me, this is the place. No pressure, just here if you need it.</em></p>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoTab;
