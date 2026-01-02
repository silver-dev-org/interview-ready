// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

type Matrix = number[][]

export default function zeroMatrix (matrix: Matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return
    }
    const rows = matrix.length
    const columns = matrix[0].length

    const zero_rows = new Set<number>()
    const zero_columns = new Set<number>()

    for (let r = 0; r < rows; r ++) {
        for (let c = 0; c < columns; c ++) {
            if (matrix[r][c] === 0) {
                zero_rows.add(r)
                zero_columns.add(c)
            }
        }
    }

    // Zero out rows
  for (const r of zero_rows) {
    for (let c = 0; c < columns; c++) {
      matrix[r][c] = 0;
    }
  }

  // Zero out columns
  for (const c of zero_columns) {
    for (let r = 0; r < rows; r++) {
      matrix[r][c] = 0;
    }
  }
}