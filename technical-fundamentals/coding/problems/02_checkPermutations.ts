// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

export default function checkPermutations(s1: string, s2: string): boolean {
    if (s1.length != s2.length) {
        return false;
    }
    const count: Record<string, number> = {};
    for (const char of s1) {
        count[char] = (count[char] || 0) + 1;
    }
    for (const char of s2) {
        if (!count[char]) {
            return false;
        }
        count[char] --;
    }
    return true;
}
