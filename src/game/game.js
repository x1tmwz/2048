const { Box, Pose } = require('./utils/helpClasses');
const {pickRandomNumber, tempArray } = require('./utils/helpFunctions');



let score = 0;
const zeroScore = () => {
    score = 0;
}

const startGame = (size) => {
    const game = [];
    for (let y = 0; y < size; y++) {
        let row = []
        for (let x = 0; x < size; x++) {
            row.push(new Box(0, new Pose(x, y), new Pose(x, y)));
        }
        game.push(row);
    }
    let pose1 = new Pose(pickRandomNumber(4), pickRandomNumber(4))
    let pose2 = new Pose(pickRandomNumber(4), pickRandomNumber(4))
    while (pose1.x === pose2.x && pose1.y === pose2.y) {
        pose1 = new Pose(pickRandomNumber(4), pickRandomNumber(4));
    }
    game[pose1.y][pose1.x].value = 2;
    game[pose2.y][pose2.x].value = 2;
    return game;
}
const isWinner = (matrix = []) => {
    return matrix.find((item) => item.value === 2048);
}
const isLoser = (matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value === 0) {
                return false;
            }
            if (matrix[i][j].value !== 0) {
                let z = j + 1
                if (z < matrix[i].length && matrix[i][j].value === matrix[i][z].value) {
                    return false;
                }
                z = i + 1
                if (z < matrix.length && matrix[i][j].value === matrix[z][j].value) {
                    return false;
                }
            }
        }
    }
    return true;
}

const boardToString = (matrix = []) => {
    let str = "";
    for(let i =0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            str += matrix[i][j].value
        }
    }
    return str;
}
const insertRandomNumber = (matrix = [], xMin, xMax, yMin, yMax) => {
    let options = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value === 0) {
                options.push({ x: i, y: j })
            }
        }
    }
    options = options.filter((option) => {
        const xMatch = xMin <= option.x && xMax >= option.x
        const yMatch = yMin <= option.y && yMax >= option.y
        return xMatch && yMatch;
    })
    if (options.length === 0) {
        return matrix;
    }
    const randomNumber = pickRandomNumber(options.length);
    const value = pickRandomNumber(3) < 2 ? 2 : 4;
    const chosen = options[randomNumber];
    matrix[chosen.x][chosen.y].value = value;
    matrix[chosen.x][chosen.y].new =true;
    return matrix;
}



const arrange = (arr) => {
    const length = arr.length
    let j = length - 1;
    const temp = tempArray(length);
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i].value !== 0) {
            temp[j] = arr[i];
            j--;
        }
    }
    return temp;
}
const merge = (arr) => {
    const length = arr.length
    for (let i = 1; i < length; i++) {
        if (arr[i].value === arr[i - 1].value) {
            arr[i].value = arr[i].value * 2;
            arr[i].merge=true;
            score = score + arr[i].value;
            arr[i - 1].value = 0;
            i++
        }
    }
    return arr;

}
const matrixArrange = (arr) => {
    let fixArray = arrange(arr);
    fixArray = merge(fixArray);
    fixArray = arrange(fixArray);
    return fixArray;

}

const moveRight = (matrix) => {
    const board1 = boardToString(matrix);
    for (let i = 0; i < matrix.length; i++) {
        let line = tempArray(matrix[i].length);
        for (let j = 0; j < matrix[i].length; j++) {
            line[j] = matrix[i][j];
        }
        line = matrixArrange(line);
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = line[j];
        }
    }
    const board2 = boardToString(matrix);
    if (board1 === board2) {
        return matrix;
    }
    return insertRandomNumber(matrix, 0, 3, 0, 1);
}
const moveLeft = (matrix) => {
    const board1 = boardToString(matrix);
    for (let i = 0; i < matrix.length; i++) {
        let line = tempArray(matrix[i].length);
        for (let j = 0; j < matrix[i].length; j++) {
            line[matrix[i].length - 1 - j] = matrix[i][j];
        }
        line = matrixArrange(line);
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = line[matrix[i].length - 1 - j];
        }
    }
    const board2 = boardToString(matrix);
    if (board1 === board2) {
        return matrix;
    }
    return insertRandomNumber(matrix, 0, 3, 2, 3);
}
const moveDown = (matrix) => {
    const board1 = boardToString(matrix);
    for (let j = 0; j < matrix.length; j++) {
        let column = tempArray(matrix[j].length);
        for (let i = 0; i < matrix[j].length; i++) {
            column[i] = matrix[i][j];
        }
        column = matrixArrange(column);
        for (let i = 0; i < matrix[j].length; i++) {
            matrix[i][j] = column[i];
        }
    }
    const board2 = boardToString(matrix);
    if (board1 === board2) {
        return matrix;
    }
    return insertRandomNumber(matrix, 0, 1, 0, 3)
}

const moveUp = (matrix) => {
    const board1 = boardToString(matrix);
    for (let j = 0; j < matrix.length; j++) {
        let column = tempArray(matrix[j].length);
        for (let i = 0; i < matrix[j].length; i++) {
            column[matrix[j].length - 1 - i] = matrix[i][j];
        }
        column = matrixArrange(column);
        for (let i = 0; i < matrix[j].length; i++) {
            matrix[i][j] = column[matrix[j].length - 1 - i];
        }
    }
    const board2 = boardToString(matrix);
    if (board1 === board2) {
        return matrix;
    }
    return insertRandomNumber(matrix, 2, 3, 0, 3);
}


export {
    startGame,
    pickRandomNumber,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    isWinner,
    isLoser,
    score,
    zeroScore,
}





