// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][];

// [[ 1, 2, 3 ],
//  [ 4, 5, 6 ],
//  [ 7, 0, 9 ] ]

// 2,1

// [[ 1, 0, 3 ],
//  [ 4, 0, 6 ],
//  [ 0, 0, 0 ] ]

export default function zeroMatrix(matrix: Matrix) {
	const indexesToBomb: [number, number][] = [];
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const val = matrix[row][col];
			if (val === 0) indexesToBomb.push([row, col]);
		}
	}

	for (const coordinate of indexesToBomb) {
		const [row, col] = coordinate;
		for (let i = 0; i < matrix[row].length; i++) {
			matrix[row][i] = 0;
		}
		for (let i = 0; i < matrix.length; i++) {
			matrix[i][col] = 0;
		}
	}
}
