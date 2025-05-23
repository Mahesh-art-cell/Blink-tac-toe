import React from 'react';

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h2>Score</h2>
      <p>You: {scores.player1}</p>
      <p>AI: {scores.player2}</p>
      <p>Tie: {scores.tie}</p>
    </div>
  );
};

export default Scoreboard;