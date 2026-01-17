import unittest
from coding.problems.python_solutions.string_rotation import string_rotation

class TestStringRotation(unittest.TestCase):
    
    def test_rotates_string(self):
        str1 = "Hello"
        str2 = "oHell"
        result = string_rotation(str1, str2)
        self.assertEqual(result, True)

    def test_rotates_another_string(self):
        str1 = "waterbottle"
        str2 = "erbottlewat"
        result = string_rotation(str1, str2)
        self.assertEqual(result, True)

if __name__ == '__main__':
    unittest.main()
