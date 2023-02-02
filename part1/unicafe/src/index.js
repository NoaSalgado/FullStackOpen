import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ text, result }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{result}</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodComent = () => {
    setGood(good + 1);
  };

  const addNeutralComment = () => {
    setNeutral(neutral + 1);
  };

  const addBadComment = () => {
    setBad(bad + 1);
  };

  const countAllComents = () => {
    return good + neutral + bad;
  };

  const calcAverageRate = () => {
    return countAllComents() / 3;
  };

  const calcAverageGood = () => {
    return good / countAllComents();
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button handleClick={addGoodComent} text='Good' />
        <Button handleClick={addNeutralComment} text='Neutral' />
        <Button handleClick={addBadComment} text='Bad' />
      </div>
      <h2>Statistics</h2>
      {good > 0 || neutral > 0 || bad > 0 ? (
        <>
          <Statistics text='Good' result={good} />
          <Statistics text='Neutral' result={neutral} />
          <Statistics text='Bad' result={bad} />
          <Statistics text='All' result={countAllComents()} />
          <Statistics text='Average' result={calcAverageRate()} />
          <Statistics text='Average  Good' result={calcAverageGood()} />
        </>
      ) : (
        <p>No statistics available</p>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
