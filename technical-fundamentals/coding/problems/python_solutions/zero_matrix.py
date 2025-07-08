from typing import List


def zero_matrix(matrix: List[List[int]]) -> None:
    if not matrix:
        return
    
    rows = len(matrix)
    columns = len(matrix[0])

    zero_rows = set()
    zero_columns = set()

    for r in range(rows):
        for c in range(columns):
            if matrix[r][c] == 0:
                zero_rows.add(r)
                zero_columns.add(c)

    # Zero rows
    for r in zero_rows:
        for c in range(columns):
            matrix[r][c] = 0
    
    # Zero columns
    for c in zero_columns:
        for r in range(rows):
            matrix[r][c] = 0