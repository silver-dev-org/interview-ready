// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export default function isUnique(str: string): boolean {
	const dic: Record<string, number> = {};
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		const exists = dic[char];
		if (exists) return false;

		dic[char] = 1;
	}
	return true;
}
