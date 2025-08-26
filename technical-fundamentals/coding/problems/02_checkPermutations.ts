// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

export default function checkPermutations(s1: string, s2: string): boolean {
	const charsDic: Record<string, number> = {};
	for (let i = 0; i < s1.length; i++) {
		const char = s1[i];
		const exists = charsDic[char];
		if (exists) charsDic[char]++;
		else charsDic[char] = 1;
	}

	for (let j = 0; j < s2.length; j++) {
		const char = s2[j];
		const isInDic = Boolean(charsDic[char]);
		if (!isInDic) return false;
		charsDic[char]--;
	}
	return Object.values(charsDic).filter((val) => val !== 0).length === 0;
}
