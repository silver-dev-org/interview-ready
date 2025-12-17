from typing import List


def rotate_matrix(matrix: List[List[int]] ) -> None:
    n = len(matrix)
    for layer in range(n // 2):
        first = layer
        last = n - 1 - layer

        for i in range(first, last):
            offset = i - first
            top = matrix[first][i]

            # left - top
            matrix[first][i] = matrix[last - offset][first]
            # bottom - left
            matrix[last - offset][first] = matrix[last][last - offset]
            # right - bottom
            matrix[last][last - offset] = matrix[i][last]
            # top - right
            matrix[i][last] = top