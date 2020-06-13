const down = "down";
const up = "up";
const left = "left";
const right = "right"

const resetAnimation = (matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const index = i * matrix.length + j;
            const animationClass = document.getElementsByClassName(index)[0].classList[1];
            if (animationClass) {
                document.getElementsByClassName(index)[0].classList.remove(animationClass)
            }
        }
    }

}

const setAnimation = (direction, matrix = []) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].value !== 0) {
                const index = i * matrix.length + j;
                let delta = 0;
                let canContinue=true;
                if (direction === right) {
                    for (let z = j + 1; z < matrix[i].length && canContinue; z++) {
                        if (matrix[i][z].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === left) {
                    for (let z = j - 1; z >= 0 && canContinue; z--) {
                        if (matrix[i][z].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === up) {
                    for (let z = i - 1; z >= 0 && canContinue; z--) {
                        if (matrix[z][j].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (direction === down) {
                    for (let z = i + 1; z < matrix[j].length && canContinue; z++) {
                        if (matrix[z][j].value === 0) {
                            delta++;
                        }else{
                            canContinue= false;
                        }
                    }
                }
                if (delta !== 0) {
                    document.getElementsByClassName(index)[0].classList.add(`move${direction}${delta}`)
                }
            }
        }
    }
}


export { setAnimation, resetAnimation, down, up, left, right };