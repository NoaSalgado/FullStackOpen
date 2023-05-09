const NewContactForm = ({ handleSubmit, handleInputChange, newPerson }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          name='name'
          onChange={handleInputChange}
          value={newPerson.name}
        />
      </div>
      <div>
        number:{' '}
        <input
          name='number'
          onChange={handleInputChange}
          value={newPerson.number}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default NewContactForm;
