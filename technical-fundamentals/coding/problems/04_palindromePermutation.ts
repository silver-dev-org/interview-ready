// 4. *Palindrome Permutation*:

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

export default function palindromePermutation(str: string): boolean {
	if (!str) return true;
	const wordDic: Record<string, number> = {};

	for (let i = 0; i < str.length; i++) {
		const char = str[i].toLocaleLowerCase();
		if (char === ' ') continue;

		if (!wordDic[char]) wordDic[char] = 0;
		wordDic[char]++;
	}

	let notPairs = 0;

	for (const value of Object.values(wordDic)) {
		if (value % 2 !== 0) {
			notPairs++;
		}
	}
	return notPairs <= 1;
}
