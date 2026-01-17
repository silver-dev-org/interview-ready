// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export default function isOneAway(str1: string, str2: string): boolean {
    if (Math.abs(str1.length - str2.length) > 1) {
        return false;
    }

    const s1 = str1.length < str2.length ? str1 : str2;
    const s2 = str1.length < str2.length ? str2 : str1;

    let index1 = 0;
    let index2 = 0;
    let foundDifference = false;

    while (index1 < s1.length && index2 < s2.length) {
        if (s1[index1] !== s2[index2]) {
            if (foundDifference) {
                return false;
            }
            foundDifference = true;

            if (s1.length === s2.length) {
                // replace: move both pointers
                index1 += 1;
                index2 += 1;
            } else {
                // insert/remove: skip char in longer string
                index2 += 1;
            }
        } else {
            index1 += 1;
            index2 += 1;
        }
    }

    return (s2.length - index2) <= 1;
}

