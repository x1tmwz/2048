import React from 'react';
import Cell from './Cell' 

const Board = ({ board }) => {
    return (
        <div className="gridR">
            {board.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="gridC">
                        {row.map((cell, cellIndex) => {
                            return (
                                <Cell number={cell} key={parseInt(rowIndex) + parseInt(cellIndex)} id={parseInt(rowIndex)*4 + parseInt(cellIndex)}/>
                                )
                        })}
                    </div>)

            })}
        </div>
    );
}
export default Board;