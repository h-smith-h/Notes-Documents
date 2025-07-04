import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
              {/* Face circle */}
              <circle cx="40" cy="40" r="35" fill="#ffdc5d" stroke="#ffa500" strokeWidth="2"/>
              
              {/* Eyes */}
              <circle cx="28" cy="32" r="4" fill="#000"/>
              <circle cx="52" cy="32" r="4" fill="#000"/>
              
              {/* Smile mouth */}
              <path d="M 25 48 Q 40 62 55 48" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              {/* Teeth */}
              <rect x="35" y="48" width="3" height="6" fill="#fff" rx="1"/>
              <rect x="39" y="48" width="3" height="6" fill="#fff" rx="1"/>
              <rect x="43" y="48" width="3" height="6" fill="#fff" rx="1"/>
              {/* Missing tooth gap on the left */}
              <rect x="31" y="48" width="3" height="6" fill="transparent"/>
              <rect x="47" y="48" width="3" height="6" fill="#fff" rx="1"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="site-info">
        <h3><FontAwesomeIcon icon={faHeart} className="icon" /> How BDG Notes Works</h3>
        
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
          <p><em>If you ever want to message me, this is the place. No pressure, just here if you need it. 💜</em></p>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoTab;
