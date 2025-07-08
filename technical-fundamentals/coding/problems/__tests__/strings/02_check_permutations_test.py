import unittest
from coding.problems.python_solutions.check_permutations import check_permutations

class TestCheckPermutations(unittest.TestCase):

    def test_permutations_same_length(self):
        self.assertTrue(check_permutations("abc", "cba"))

    def test_different_lengths(self):
        self.assertFalse(check_permutations("abc", "cbad"))

    def test_permutations_with_special_characters(self):
        self.assertTrue(check_permutations("abc!", "!bac"))

    def test_non_permutations_with_special_characters(self):
        self.assertFalse(check_permutations("abc!", "!bcd"))

    def test_empty_strings(self):
        self.assertTrue(check_permutations("", ""))

    def test_long_identical_strings(self):
        self.assertTrue(check_permutations("a" * 1000, "a" * 1000))

    def test_long_different_strings(self):
        self.assertFalse(check_permutations("a" * 1000, "b" * 1000))

if __name__ == '__main__':
    unittest.main()
