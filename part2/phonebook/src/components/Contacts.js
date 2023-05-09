import Contact from './Contact';

const Contacts = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Contact key={person.name} person={person} />
      ))}
    </>
  );
};

export default Contacts;
