import unittest
from coding.problems.python_solutions.palindrome_permutation import palindrome_permutation

class TestPalindromePermutation(unittest.TestCase):

    def test_empty_string(self):
        self.assertTrue(palindrome_permutation(""))

    def test_single_character(self):
        self.assertTrue(palindrome_permutation("a"))

    def test_palindrome_odd_length(self):
        self.assertTrue(palindrome_permutation("taco cat"))

    def test_palindrome_even_length(self):
        self.assertTrue(palindrome_permutation("rdeder"))

    def test_non_palindrome_odd_length(self):
        self.assertFalse(palindrome_permutation("hello"))

    def test_non_palindrome_even_length(self):
        self.assertFalse(palindrome_permutation("world"))

    def test_mixed_case(self):
        self.assertTrue(palindrome_permutation("RaceCar"))

    def test_numeric_palindrome(self):
        self.assertTrue(palindrome_permutation("12321"))

    def test_impossible_permutation(self):
        self.assertFalse(palindrome_permutation("abcdefg"))

if __name__ == '__main__':
    unittest.main()
