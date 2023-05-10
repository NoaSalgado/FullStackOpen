const Contact = ({ person, deleteContact }) => {
  return (
    <div>
      {person.name} {person.number}
      {'      '}
      <button onClick={() => deleteContact(person.id, person.name)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
