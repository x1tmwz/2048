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
const resetBoxesSpeacialValues =(matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j].resetSpeacialValues();
        }
    }
    return matrix;
}
module.exports ={tempArray,pickRandomNumber,resetBoxesSpeacialValues}