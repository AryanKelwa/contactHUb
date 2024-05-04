import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentContact,setCurrentContact]=useState([])

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/contacts');
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const openCreateModel = () => {
    setIsModelOpen(true);
  };

  const openEditModel =(contact)=>{
    if (isModelOpen) return
    setCurrentContact(contact)
    setIsModelOpen(true)
  }

  const onUpdate =()=>{
    closeModel()
    fetchContacts()
  }

  return (
    <div className="app-container">
      <header>
        <h1>Contact Manager</h1>
      </header>
      <main>
        <ContactList contacts={contacts} updateContact={openEditModel} updateCallback={onUpdate} />
        <button className="create-btn" onClick={openCreateModel}>Create a new contact</button>
        {isModelOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={closeModel}>&times;</span>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
