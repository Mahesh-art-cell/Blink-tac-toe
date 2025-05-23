import React from 'react';
import Cell from './Cell';

const Board = ({ board, handleClick, winningPattern }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          emoji={cell}
          onClick={() => handleClick(index)}
          highlight={winningPattern.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;