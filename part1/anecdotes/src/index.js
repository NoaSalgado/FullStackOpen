import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ anecdote, points }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>This anecdote has {points} votes</p>
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const onButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const onVoteClick = () => {
    const pointsCopy = [...points];
    pointsCopy[selected]++;
    setPoints(pointsCopy);
  };

  const getMaxVotes = () => {
    return Math.max(...points);
  };

  const getMostVotedAnecdote = () => {
    return anecdotes[points.indexOf(getMaxVotes())];
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={onButtonClick} text='Get anecdote' />
      <Button handleClick={onVoteClick} text='Vote this quote' />

      <h2>Anecdote whith most votes</h2>
      <Anecdote anecdote={getMostVotedAnecdote()} points={getMaxVotes()} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
