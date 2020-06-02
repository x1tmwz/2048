import React, { useState, useEffect } from 'react';
import {
  startGame,
  moveRight,
  moveLeft,
  moveDown,
  moveUp,
  isLoser,
  isWinner,
  score,
  zeroScore,
  
} from '../game/game';
import Board from './Board';
const Game = () => {
  const [board, setBoard] = useState({ map: startGame() });
  const [totalScore, setTotaleScore] = useState(score);
  const [winner, setWinner] = useState(false);
  const keyHandler = (e) => {
    if (isLoser(board.map)) {
      alert("You lose start a new game");
      return;
    }
    isWinner(board.map) && setWinner(true);
    switch (e.keyCode) {
      case 40:
        setBoard({ map: moveDown(board.map) });
        break;
      case 38:
        setBoard({ map: moveUp(board.map) });
        break;
      case 39:
        setBoard({ map: moveRight(board.map) });
        break;
      case 37:
        setBoard({ map: moveLeft(board.map) });
        break;
      default:
        return;
    }
  }
  useEffect(() => {
    setTotaleScore(score)
  },[])
  const newGameHandler = (e) => {
    zeroScore();
    setBoard({ map: startGame() })
  }

  return (
    <div className="wrapperC">
      <h1>2048</h1>
      <h4>{`Total score:${totalScore}`}</h4>
      <button type="button" onClick={newGameHandler} className="newGame">new game</button>
      <div className="wrapper">
        <div id="game" onKeyDown={keyHandler} tabIndex="0">
          <Board board={board.map} />
        </div>
      </div>
      {winner ? <h1>Winner!!!</h1>:<p>To play the game click on him and use arrow keys </p>}
    </div>



  );
}
export default Game;