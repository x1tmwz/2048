export default (matrix = []) => {
    let copy = [];
    for (let i = 0; i < matrix.length; i++) {
        let row = []
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(matrix[i][j]);
        }
        copy.push(row);
    }
    return copy;

}