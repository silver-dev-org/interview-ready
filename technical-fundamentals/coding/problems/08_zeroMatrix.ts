// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][]

export default function zeroMatrix (matrix: Matrix) {

    const rows: number[] = [];
    const cols: number[] = [];
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].includes(0)) {
            rows.push(row)
        }
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                if (!cols.includes(col)) {
                    cols.push(col)
                }
            }
        }
    }
    for (let row of rows) {
        matrix[row] = matrix[row].map(() => 0)
    }
    for (let col of cols) {
        for (let row = 0; row < matrix.length; row++) {
            matrix[row][col] = 0
        }
    }
    return matrix;
}