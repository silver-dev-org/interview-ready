import unittest
from coding.problems.python_solutions.string_compression import string_compression

class TestStringCompression(unittest.TestCase):

    def test_compresses_repeated_characters(self):
        self.assertEqual(string_compression('aabcccccaaa'), 'a2b1c5a3')

    def test_returns_original_if_not_shorter(self):
        self.assertEqual(string_compression('abcde'), 'abcde')

    def test_empty_string(self):
        self.assertEqual(string_compression(''), '')

    def test_single_character(self):
        self.assertEqual(string_compression('a'), 'a')

    def test_upper_and_lower_case(self):
        self.assertEqual(string_compression('AAAbbbCCCddd'), 'A3b3C3d3')

    def test_no_repeated_characters(self):
        self.assertEqual(string_compression('abcdef'), 'abcdef')


if __name__ == '__main__':
    unittest.main()
