// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

// [1,2,3]
// [4,5,6]
// [7,8,9]

// [1,4,7]
// [2,5,8]
// [3,6,9]

// [7,4,1]
// [8,5,2]
// [9,6,3]

type Matrix = number[][];

export default function rotateMatrix(matrix: Matrix) {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = row + 1; col < matrix.length; col++) {
			const temp = matrix[row][col];
			matrix[row][col] = matrix[col][row];
			matrix[col][row] = temp;
		}
	}

	for (const row of matrix) row.reverse();
}
