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
    const sanitized = str.toLowerCase().replaceAll(' ', '').split('');

    const [s1, s2] = sanitized.length % 2 === 0 ?
        [sanitized.slice(0, sanitized.length / 2),       sanitized.slice(sanitized.length / 2, sanitized.length)] :
        [sanitized.slice(0, (sanitized.length / 2) + 1), sanitized.slice(sanitized.length / 2, sanitized.length)]

    const chars: Record<string, number> = {}
    for (let i=0; i<=s1.length - 1; i++) {

        s1[i] in chars ? chars[s1[i]]++ : chars[s1[i]] = 1;
        s2[i] in chars ? chars[s2[i]]-- : chars[s2[i]] = -1;

    }

    return !Object.values(chars).some(item => item !== 0);


}