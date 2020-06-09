const down = "down";
const up = "up";
const left = "left";
const right = "right"


const setAnimation = (direction, matrix = []) => {
    if (direction === right || direction === down) {
        for (let i = matrix.length - 1; i >= 0; i--) {
            for (let j = matrix[i].length - 1; j >= 0; j--) {
                if (matrix[i][j].value !== 0) {
                    const index = (i * matrix.length) + j;
                    let delta = 0;
                    let cellNextToMe;
                    let z;
                    if (direction === right) {
                        delta = Math.abs(matrix.length - 1 - j)
                        z=j+1;
                        if(z < matrix.length){
                            cellNextToMe = matrix[i][z];
                        }
                    }
                    if (direction === down) {
                        delta = Math.abs(matrix.length - 1 - i)
                        z=i+1;
                        if(z < matrix.length){
                            cellNextToMe = matrix[z][j];
                        }
                    }
                    if (delta !== 0 && cellNextToMe.value ===0) {
                        document.getElementsByClassName(index)[0].style.animation = `${direction} 200ms ease 100ms`;
                    }

                }

            }
        }
    }
    if (direction === left || direction === up) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].value !== 0) {
                    const index = i * matrix.length + j;
                    let delta = 0;
                    let cellNextToMe;
                    let z;
                    if (direction === up) {
                        delta = Math.abs(0 - i)
                        z=i-1;
                        if(z >= 0){
                            cellNextToMe = matrix[i][z];
                        }
                    }
                    if (direction === left) {
                        delta = Math.abs(0 - j);
                        z=j-1;
                        if(z >= 0){
                            cellNextToMe = matrix[i][z];
                        }
                    }
                    if (delta !== 0 && cellNextToMe.value === 0) {
                        document.getElementsByClassName(index)[0].style.animation = `${direction} 200ms ease 100ms`;
                    }

                }

            }
        }

    }



}
export { setAnimation, down, up, left, right };