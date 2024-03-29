import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import NewContactForm from './components/NewContactForm';
import Contacts from './components/Contacts';
import Notification from './components/Notification';
import contactService from './services/contact';

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [notification, setNotification] = useState('');

  const personsToShow = filteredPersons.length > 0 ? filteredPersons : persons;

  useEffect(() => {
    contactService.getContacts().then((contacts) => setPersons(contacts));
  }, []);

  const handleInputChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find(
      (person) => person.name === newPerson.name
    );

    if (personExists) {
      if (
        window.confirm(
          `${newPerson.name} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .updateContact(personExists.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === personExists.id ? updatedPerson : person
              )
            );
          })
          .catch((error) => {
            setMessage(
              `${newPerson.name} has already been removed from server`
            );
            setNotification('error');
            setTimeout(() => {
              setMessage(null);
              setNotification('');
            }, 3000);
          });
      }
    } else {
      contactService
        .createContact(newPerson)
        .then((newContact) => setPersons([...persons, newContact]));
      setMessage(`${newPerson.name} has been successfully added`);
      setNotification('success');

      setTimeout(() => {
        setMessage(null);
        setNotification('');
      }, 3000);
    }
    setNewPerson({
      name: '',
      number: '',
    });
  };

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactService.deleteContact(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setFilteredPersons(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} notification={notification} />
      <Filter handleSearch={handleSearch} />
      <h2>Add new Contact</h2>
      <NewContactForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      {personsToShow ? (
        <Contacts personsToShow={personsToShow} deleteContact={deleteContact} />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
