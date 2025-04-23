// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

type Matrix = number[][]

export default function rotateMatrix (matrix: Matrix) {

    const rotatedMatrix= [];
    //move all cols from left to rows from top
    for (let col = 0; col < matrix[0].length; col++) {
        const cols: number[] = [];
        for (let row = matrix.length - 1; row >= 0; row--) {
            cols.push(matrix[row][col]);
        }
        rotatedMatrix.push(cols);
    }
    // now replace original matrix since the parameter is passed as reference
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] = rotatedMatrix[row][col];
        }
    }
}