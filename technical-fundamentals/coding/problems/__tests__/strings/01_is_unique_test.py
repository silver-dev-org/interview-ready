import unittest
from coding.problems.python_solutions.is_unique import is_unique_chars

class TestIsUnique(unittest.TestCase):

    def test_unique_characters(self):
        self.assertTrue(is_unique_chars("abc"))
        self.assertTrue(is_unique_chars("abcdefg"))
        self.assertTrue(is_unique_chars("123456"))
        self.assertTrue(is_unique_chars("!@#$%^"))

    def test_non_unique_characters(self):
        self.assertFalse(is_unique_chars("aab"))
        self.assertFalse(is_unique_chars("hello"))
        self.assertFalse(is_unique_chars("testing"))
        self.assertFalse(is_unique_chars("1234456"))
        self.assertFalse(is_unique_chars("abccdef"))

    def test_empty_string(self):
        self.assertTrue(is_unique_chars(""))

    def test_whitespace_handling(self):
        self.assertFalse(is_unique_chars("a b c"))
        self.assertTrue(is_unique_chars("ab c"))

    def test_special_characters(self):
        self.assertTrue(is_unique_chars("!@#$%^&*"))
        self.assertFalse(is_unique_chars("!@#$%^&*!"))

    def test_mixed_case(self):
        self.assertTrue(is_unique_chars("aA"))
        self.assertTrue(is_unique_chars("Aa"))
        self.assertFalse(is_unique_chars("Hello"))

if __name__ == '__main__':
    unittest.main()
