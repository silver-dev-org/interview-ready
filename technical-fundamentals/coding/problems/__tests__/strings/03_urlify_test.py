import unittest
from coding.problems.python_solutions.urlify import urlify  # Asegúrate de que la función esté definida con este nombre

class TestURLify(unittest.TestCase):

    def test_replaces_spaces(self):
        self.assertEqual(urlify('ab c'), 'ab%20c')

    def test_leading_trailing_spaces(self):
        self.assertEqual(urlify('  ab c  '), '%20%20ab%20c%20%20')

    def test_empty_string(self):
        self.assertEqual(urlify(''), '')

    def test_no_spaces(self):
        self.assertEqual(urlify('abc'), 'abc')

    def test_multiple_consecutive_spaces(self):
        self.assertEqual(urlify('a  b   c'), 'a%20%20b%20%20%20c')

    def test_special_characters(self):
        self.assertEqual(urlify('a b!c'), 'a%20b!c')

    def test_mr_john_smith(self):
        self.assertEqual(urlify('Mr 3ohn Smith'), 'Mr%203ohn%20Smith')

if __name__ == '__main__':
    unittest.main()
