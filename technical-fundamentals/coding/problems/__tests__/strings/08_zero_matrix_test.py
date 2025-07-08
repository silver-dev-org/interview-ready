import unittest
from typing import List
from coding.problems.python_solutions.zero_matrix import zero_matrix

class TestZeroMatrix(unittest.TestCase):

    def test_zeroes_2x2_matrix(self):
        matrix = [
            [0, 2],
            [3, 4],
        ]
        expected = [
            [0, 0],
            [0, 4],
        ]
        zero_matrix(matrix)
        self.assertEqual(matrix, expected)

    def test_zeroes_3x3_matrix(self):
        matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 0, 9],
        ]
        expected = [
            [1, 0, 3],
            [4, 0, 6],
            [0, 0, 0],
        ]
        zero_matrix(matrix)
        self.assertEqual(matrix, expected)

    def test_zeroes_4x4_matrix(self):
        matrix = [
            [1, 2, 3, 4],
            [5, 6, 0, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        expected = [
            [1, 2, 0, 4],
            [0, 0, 0, 0],
            [9, 10, 0, 12],
            [13, 14, 0, 16],
        ]
        zero_matrix(matrix)
        self.assertEqual(matrix, expected)

    def test_two_zeroes_4x4_matrix(self):
        matrix = [
            [0, 2, 3, 4],
            [5, 6, 0, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 10, 0, 12],
            [0, 14, 0, 16],
        ]
        zero_matrix(matrix)
        self.assertEqual(matrix, expected)

if __name__ == '__main__':
    unittest.main()
