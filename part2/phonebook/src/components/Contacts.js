import Contact from './Contact';

const Contacts = ({ personsToShow, deleteContact }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Contact
          key={person.name}
          person={person}
          deleteContact={deleteContact}
        />
      ))}
    </>
  );
};

export default Contacts;
