import unittest
from coding.problems.python_solutions.one_away import one_away  # Replace with your actual function import

class TestOneAway(unittest.TestCase):

    def test_replace(self):
        self.assertTrue(one_away("pale", "bale"))
        self.assertFalse(one_away("bbaa", "bcca"))

    def test_insert(self):
        self.assertTrue(one_away("pale", "ple"))

    def test_remove(self):
        self.assertTrue(one_away("pale", "pales"))

    def test_same_strings(self):
        self.assertTrue(one_away("abc", "abc"))

    def test_more_than_one_edit_away(self):
        self.assertFalse(one_away("abcd", "efgh"))
        self.assertFalse(one_away("palesa", "pale"))

    def test_empty_strings(self):
        self.assertTrue(one_away("", ""))

    def test_one_char_difference(self):
        self.assertTrue(one_away("a", "ab"))
        self.assertTrue(one_away("", "a"))

if __name__ == "__main__":
    unittest.main()
