const Notification = ({ message, notification }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className={`notification ${
        notification === 'error' ? 'error' : 'success'
      }`}>
      {message}
    </div>
  );
};

export default Notification;
