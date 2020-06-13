const {Box} = require('./helpClasses');

const tempArray = (length) => {
    const arry = [];
    for (let i = 0; i < length; i++) {
        arry.push(new Box(0));
    }
    return arry;
}
const pickRandomNumber = (num) => {
    return Math.floor(Math.random() * num);
}
const copyBoard = (matrix) => {
    const copy = []
    for (let i = 0; i < matrix.length; i++) {
        const row = []
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(new Box(matrix[i][j].value,matrix[i][j].merge,matrix[i][j].new));
        }
        copy.push(row);
    }
    return copy;
}
const resetBoxesSpeacialValues =(matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j].resetSpeacialValues();
        }
    }
    return matrix;
}
const boardToString = (matrix = []) => {
    let str = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            str += matrix[i][j].value
        }
    }
    return str;
}

module.exports ={tempArray,pickRandomNumber,resetBoxesSpeacialValues,boardToString,copyBoard}