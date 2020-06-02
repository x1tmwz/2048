let score = 0;
const zeroScore =()=>{
    score = 0;
}
const startGame = () => {
    const game = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
    let pose1 = randomPose(4);
    let pose2 = randomPose(4);
    while (pose1.x === pose2.x && pose1.y === pose2.y) {
        pose1 = randomPose(4);
    }
    game[pose1.x][pose1.y] = 2;
    game[pose2.x][pose2.y] = 2;
    return game;
}
const isWinner = (matrix = []) => {
    return matrix.find((item) => item === 2048);
}
const isLoser = (matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] ===0){
                return false;
            }
            if (matrix[i][j] !== 0) {
                let z = j + 1
                if (z <= matrix[i].length && matrix[i][j] === matrix[i][z]) {
                    return false;
                }
                z = i + 1
                if (z < matrix.length && matrix[i][j] === matrix[z][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}
const pickRandomNumber = (max, min) => {
    if (min) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    return Math.floor(Math.random() * max);
}
const randomPose = (max, min) => {
    if (min) {
        return { x: pickRandomNumber(max, min), y: pickRandomNumber(max, min) }
    }
    return { x: pickRandomNumber(max), y: pickRandomNumber(max) }
}
const boardToString = (matrix = []) => {
    let str = "";
    matrix.forEach((item) => {
        str += item;

    })
    return str;
}
const insertRandomNumber = (matrix = [], xMin, xMax, yMin, yMax) => {
    let options = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
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
    matrix[chosen.x][chosen.y] = value;
    return matrix;
}

const tempArray = (length) => {
    const arry = [];
    for (let i = 0; i < length; i++) {
        arry.push(0)
    }
    return arry;
}

const arrange = (arr) => {
    const length = arr.length
    let j = length - 1;
    const temp = tempArray(length);
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i] !== 0) {
            temp[j] = arr[i];
            j--;
        }
    }
    for (let i = 0; i < length; i++) {
        arr[i] = temp[i];
    }
    return arr;
}
const merge = (arr) => {
    const length = arr.length
    for (let i = 1; i < length; i++) {
        if (arr[i] === arr[i - 1]) {
            arr[i] = arr[i] * 2;
            score = score +arr[i];
            arr[i - 1] = 0;
            i++
        }
    }
}
const matrixArrange = (arr,) => {
    arrange(arr);
    merge(arr);
    arrange(arr);
}

const moveRight = (matrix) => {
    const board1 = boardToString(matrix);
    for (let i = 0; i < matrix.length; i++) {
        const line = tempArray(matrix[i].length);
        for (let j = 0; j < matrix[i].length; j++) {
            line[j] = matrix[i][j];
        }
        matrixArrange(line);
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
        const line = tempArray(matrix[i].length);
        for (let j = 0; j < matrix[i].length; j++) {
            line[matrix[i].length - 1 - j] = matrix[i][j];
        }
        matrixArrange(line);
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
        const column = tempArray(matrix[j].length);
        for (let i = 0; i < matrix[j].length; i++) {
            column[i] = matrix[i][j];
        }
        matrixArrange(column);
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
        const column = tempArray(matrix[j].length);
        for (let i = 0; i < matrix[j].length; i++) {
            column[matrix[j].length - 1 - i] = matrix[i][j];
        }
        matrixArrange(column,score);
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
    randomPose,
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





