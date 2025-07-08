// 4. *Palindrome Permutation*: 

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

export default function palindromePermutation (str: string): boolean {
    let normalized: string = "";

    for (let i = 0; i < str.length; i++) {
        if (/[a-zA-Z0-9]/.test(str[i])) {
            normalized += str[i].toLowerCase();
        }
    }

    const charCounts: { [key: string]: number} = {};
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized[i];
        if (charCounts[char]) {
            charCounts[char] += 1;
        }else {
            charCounts[char] = 1;
        }
    }

    let oddCount = 0;
    for (const char in charCounts) {
        if (charCounts[char] % 2 !== 0) {
        oddCount += 1;
        if (oddCount > 1) {
            return false;
        }
      }
    }

    return true
}