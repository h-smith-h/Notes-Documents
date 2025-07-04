import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
}

interface ContactListProps {
  onSelectContact: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  // Joseph is the only contact
  const contacts: Contact[] = [
    {
      id: 'joseph',
      name: 'Joseph',
      lastMessage: 'Tap to start messaging'
    }
  ];

  return (
    <motion.div 
      className="contacts-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {contacts.map(contact => (
        <motion.div 
          key={contact.id}
          className="contact-item"
          onClick={() => onSelectContact(contact.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="contact-info">
            <div className="contact-name">{contact.name}</div>
            {contact.lastMessage && (
              <div className="last-message">{contact.lastMessage}</div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactList;