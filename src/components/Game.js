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
import copyBoard from '../utils/copyBoard';
import {resetBoxesSpeacialValues} from '../game/utils/helpFunctions';
import { setAnimation, left, right, down, up } from '../utils/setAnimation';



const Game = () => {
  const [board, setBoard] = useState({ map: startGame(4) });
  const [totalScore, setTotaleScore] = useState(score);
  const [winner, setWinner] = useState(false);
  const [num,setNum]=useState(1);

  const keyHandler = (e) => {
    e.preventDefault();
    if (isLoser(board.map)) {
      alert("You lose start a new game");
      return;
    }
    isWinner(board.map) && setWinner(true);
    let oldBoard = copyBoard(board.map);
    resetBoxesSpeacialValues(board.map);
    let direction;
    let newBoard;
    switch (e.keyCode) {
      case 40:
        newBoard = moveDown(board.map);
        direction = down;
        break;
      case 38:
        newBoard = moveUp(board.map);
        direction = up;
        break;
      case 39:
        direction = right;
        newBoard = moveRight(board.map);
        break;
      case 37:
        direction = left;
        newBoard = moveLeft(board.map);
        break;
      default:
        return;
    }
    setAnimation(direction,oldBoard);
    setTimeout(()=>{
      setBoard({ map: newBoard });
    },170)

  }

  useEffect(() => {
    setTotaleScore(score)
  }, [score])

  const newGameHandler = (e) => {
    zeroScore();
    setBoard({ map: startGame(4) })
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
      {winner ? <h1>Winner!!!</h1> : <p>To play the game click on him and use arrow keys </p>}
    </div>



  );
}
export default Game;