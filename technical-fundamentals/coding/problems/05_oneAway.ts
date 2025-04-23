// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export default function isOneAway(str1: string, str2: string): boolean {
    if (Math.abs(str1.length - str2.length) > 1 ) {
        return false
    }

    let acc = 0;
    for (let i1=0, i2=0; i1<str1.length, i2<str2.length; i1++, i2++) {
        if (str1[i1] !== str2[i2]) {
            if (str1.length < str2.length) {
                i2++;
            } else if (str1.length > str2.length) {
                i2--;
            }
            acc++
        }
        if (acc>1) {
            return false;
        }
    }


    return true;
}
