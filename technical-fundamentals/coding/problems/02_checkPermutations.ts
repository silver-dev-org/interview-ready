// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

export default function checkPermutations(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) return false;
    const chars: Record<string, number> = {}
    for (let i=0; i<=s1.length - 1; i++) {

        s1[i] in chars ? chars[s1[i]]++ : chars[s1[i]] = 1;
        s2[i] in chars ? chars[s2[i]]-- : chars[s2[i]] = -1;

    }
    return !Object.values(chars).some(item => item !== 0);
}
