import { useState } from 'react';
import Filter from './components/Filter';
import NewContactForm from './components/NewContactForm';
import Contacts from './components/Contacts';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });
  const [filteredPersons, setFilteredPersons] = useState([]);

  const personsToShow = filteredPersons.length > 0 ? filteredPersons : persons;

  const handleInputChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists =
      persons.filter((person) => person.name === newPerson.name).length > 0;

    if (personExists) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
    }
    setNewPerson({
      name: '',
      number: '',
    });
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
      <Filter handleSearch={handleSearch} />
      <h2>Add new Contact</h2>
      <NewContactForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Contacts personsToShow={personsToShow} />
    </div>
  );
}

export default App;
