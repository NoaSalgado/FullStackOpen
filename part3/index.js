const express = require('express');
const app = express();
app.use(express.json());

let contacts = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(contacts);
});

const generateId = () => {
  const maxId =
    contacts.length > 0
      ? Math.max(...contacts.map((contact) => contact.id))
      : 0;
  return maxId + 1;
};

app.get('/info', (request, response) => {
  const requestTime = new Date();
  response.send(`<div>
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${requestTime}</p>
  </div>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const contact = contacts.find((contact) => contact.id == id);

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const newContact = request.body;

  if (contacts.find((contact) => contact.name === newContact.name)) {
    return response.status(400).json({
      error: 'Contact already exists',
    });
  }

  if (!newContact.name) {
    return response.status(400).json({
      error: 'Missing contact name',
    });
  }

  if (!newContact.number) {
    return response.status(400).json({
      error: 'Missing contact number',
    });
  }

  const contact = {
    id: generateId(),
    name: newContact.name,
    number: newContact.number,
  };

  contacts = [...contacts, contact];
  response.json(contacts);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
