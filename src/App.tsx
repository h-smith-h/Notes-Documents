import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faAddressBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './styles/main.scss';

// Components
import LoadingScreen from './components/LoadingScreen';
import ContactList from './components/ContactList';
import MessageList from './components/MessageList';
import InfoTab from './components/InfoTab';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'contacts' | 'messages'>('info');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
    setActiveTab('messages');
  };

  const handleBackToContacts = () => {
    setActiveTab('contacts');
    setSelectedContact(null);
  };

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <div className="app-container">
        <header className="header">
          <h1>BDG Notes</h1>
          <span className="version">v1.5</span>
        </header>

        {!selectedContact && (
          <div className="nav-tabs">
            <div 
              className={`tab ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="icon" />
              Info
            </div>
            <div 
              className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <FontAwesomeIcon icon={faAddressBook} className="icon" />
              Contacts
            </div>
            <div 
              className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <FontAwesomeIcon icon={faMessage} className="icon" />
              Messages
            </div>
          </div>
        )}

        {activeTab === 'info' && !selectedContact && (
          <InfoTab />
        )}

        {activeTab === 'contacts' && !selectedContact && (
          <ContactList onSelectContact={handleSelectContact} />
        )}

        {(activeTab === 'messages' || selectedContact) && (
          selectedContact ? (
            <MessageList 
              contactId={selectedContact} 
              onBack={handleBackToContacts} 
            />
          ) : (
            <div className="select-contact-message">
              Please select a contact to start messaging
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
