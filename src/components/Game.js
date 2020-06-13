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
  insertRandomNumber
} from '../game/game';
import Board from './Board';
import { Range } from '../game/utils/helpClasses';
import { resetBoxesSpeacialValues, boardToString, getRange } from '../game/utils/helpFunctions';
import { setAnimation, resetAnimation, left, right, down, up } from '../utils/setAnimation';



const Game = () => {
  const [board, setBoard] = useState(startGame(4));
  const [totalScore, setTotaleScore] = useState(score);
  const [winner, setWinner] = useState(false);

  const keyHandler = (e) => {
    e.preventDefault();
    if (isLoser(board)) {
      alert("You lose start a new game");
      return;
    }
    isWinner(board) && setWinner(true);
    resetBoxesSpeacialValues(board);
    let direction;
    let newBoard;
    // this range is for insert number logic
    let xRange = new Range(0, 4);
    let yRange = new Range(0, 4)
    switch (e.keyCode) {
      case 40:
        newBoard = moveDown(board);
        direction = down;
        xRange.set(0, 1)
        yRange.set(0, 3)
        break;
      case 38:
        newBoard = moveUp(board);
        direction = up;
        xRange.set(2, 3)
        yRange.set(0, 3)
        break;
      case 39:
        direction = right;
        newBoard = moveRight(board);
        xRange.set(0, 3)
        yRange.set(0, 1)
        break;
      case 37:
        direction = left;
        newBoard = moveLeft(board);
        xRange.set(0, 3)
        yRange.set(2, 3)
        break;
      default:
        return;
    }
    if (!(boardToString(newBoard) === boardToString(board))) {
      setAnimation(direction, board);
      setTimeout(() => {
        setBoard(insertRandomNumber(newBoard, xRange.min, xRange.max, yRange.min, yRange.max));
        resetAnimation(newBoard);
      }, 150)
     
    } 


  }

  useEffect(() => {
    setTotaleScore(score)
  }, [score])

  const newGameHandler = (e) => {
    zeroScore();
    setBoard(startGame(4))
  }

  return (
    <div className="wrapperC">
      <h1>2048</h1>
      <h4>{`Total score:${totalScore}`}</h4>
      <button type="button" onClick={newGameHandler} className="newGame">new game</button>
      <div className="wrapper">
        <div id="game" onKeyDown={keyHandler} tabIndex="0">
          <Board board={board} />
        </div>
      </div>
      {winner ? <h1>Winner!!!</h1> : <p>To play the game click on him and use arrow keys </p>}
    </div>



  );
}
export default Game;