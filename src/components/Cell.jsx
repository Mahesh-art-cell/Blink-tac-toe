import React from 'react';

const Cell = ({ emoji, onClick, highlight }) => {
  return (
    <div className={`cell ${highlight ? 'highlight' : ''}`} onClick={onClick}>
      {emoji}
    </div>
  );
};

export default Cell;