// import React, { useState } from 'react';
// import Board from './components/Board';
// import Scoreboard from './components/Scoreboard';
// import { emojiCategories } from './emojiCategories';
// import { checkWinner } from './utils/helpers';
// import './styles/styles.css';

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [player1Emojis, setPlayer1Emojis] = useState([]);
//   const [player2Emojis, setPlayer2Emojis] = useState([]);
//   const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
//   const [scores, setScores] = useState({ player1: 0, player2: 0, tie: 0 });
//   const [category1] = useState("Animals");
//   const [category2] = useState("Food");
//   const [gameOver, setGameOver] = useState(false);

//   const handleClick = index => {
//     if (board[index] || gameOver) return;

//     const currentCategory = isPlayerOneTurn ? category1 : category2;
//     const currentEmoji = emojiCategories[currentCategory][Math.floor(Math.random() * 4)];
//     const newBoard = [...board];
//     newBoard[index] = currentEmoji;
//     setBoard(newBoard);

//     const currentEmojis = isPlayerOneTurn ? [...player1Emojis] : [...player2Emojis];
//     if (currentEmojis.length === 3) {
//       const [oldestIndex] = currentEmojis;
//       if (oldestIndex === index) return; // can't place on oldest cell
//       newBoard[oldestIndex] = null;
//       currentEmojis.shift();
//     }
//     currentEmojis.push(index);

//     const winnerPattern = checkWinner(newBoard, currentEmojis);
//     if (winnerPattern) {
//       const winner = isPlayerOneTurn ? "Player 1" : "Player 2";
//       alert(`${winner} wins!`);
//       setGameOver(true);
//       setScores(prev => ({
//         ...prev,
//         [isPlayerOneTurn ? 'player1' : 'player2']: prev[isPlayerOneTurn ? 'player1' : 'player2'] + 1,
//       }));
//       return;
//     }

//     isPlayerOneTurn ? setPlayer1Emojis(currentEmojis) : setPlayer2Emojis(currentEmojis);
//     setIsPlayerOneTurn(!isPlayerOneTurn);
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setPlayer1Emojis([]);
//     setPlayer2Emojis([]);
//     setIsPlayerOneTurn(true);
//     setGameOver(false);
//   };

//   return (
//     <div className="game-container">
//       <h1>Blink Tac Toe</h1>
//       <div className="emoji-title">{isPlayerOneTurn ? "😎 Your Turn" : "🤖 Opponent's Turn"}</div>
//       <Board board={board} handleClick={handleClick} />
//       <button className="reset-button" onClick={resetGame}>Play Again</button>
//       <Scoreboard scores={scores} />
//       <footer>
//         <p>By Dovydas Stirpeika 🔥</p>
//         <p>Emojis from EmojiOne</p>
//       </footer>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import { emojiCategories } from './emojiCategories';
import { checkWinner } from './utils/helpers';
import './styles/styles.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1Emojis, setPlayer1Emojis] = useState([]);
  const [player2Emojis, setPlayer2Emojis] = useState([]);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0, tie: 0 });
  const [category1] = useState("Animals");
  const [category2] = useState("Food");
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [winningPattern, setWinningPattern] = useState([]);

  const handleClick = index => {
    if (board[index] || gameOver) return;

    const currentCategory = isPlayerOneTurn ? category1 : category2;
    const currentEmoji = emojiCategories[currentCategory][Math.floor(Math.random() * 4)];
    const newBoard = [...board];
    newBoard[index] = currentEmoji;
    setBoard(newBoard);

    const currentEmojis = isPlayerOneTurn ? [...player1Emojis] : [...player2Emojis];
    if (currentEmojis.length === 3) {
      const [oldestIndex] = currentEmojis;
      if (oldestIndex === index) return; // can't place on oldest cell
      newBoard[oldestIndex] = null;
      currentEmojis.shift();
    }
    currentEmojis.push(index);

    const winnerPattern = checkWinner(newBoard, currentEmojis);
    if (winnerPattern) {
      const winner = isPlayerOneTurn ? "Player 1" : "Player 2";
      setWinnerMessage(`${winner} wins! 🎉`);
      setGameOver(true);
      setWinningPattern(winnerPattern);
      setScores(prev => ({
        ...prev,
        [isPlayerOneTurn ? 'player1' : 'player2']: prev[isPlayerOneTurn ? 'player1' : 'player2'] + 1,
      }));
      return;
    }

    isPlayerOneTurn ? setPlayer1Emojis(currentEmojis) : setPlayer2Emojis(currentEmojis);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer1Emojis([]);
    setPlayer2Emojis([]);
    setIsPlayerOneTurn(true);
    setGameOver(false);
    setWinnerMessage('');
    setWinningPattern([]);
  };

  return (
    <div className="game-container">
      <h1>Blink Tac Toe</h1>
      {winnerMessage && <h2 className="winner-message">{winnerMessage}</h2>}
      {!winnerMessage && (
        <div className="emoji-title">
          {isPlayerOneTurn ? "😎 Your Turn" : "🤖 Opponent's Turn"}
        </div>
      )}
      <Board board={board} handleClick={handleClick} winningPattern={winningPattern} />
      <button className="reset-button" onClick={resetGame}>Play Again</button>
      <Scoreboard scores={scores} />
      <footer>
        <p>By Dovydas Stirpeika 🔥</p>
        <p>Emojis from EmojiOne</p>
      </footer>
    </div>
  );
};

export default App;