const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => part.exercises + acc, 0);

  return (
    <div>
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Total;
