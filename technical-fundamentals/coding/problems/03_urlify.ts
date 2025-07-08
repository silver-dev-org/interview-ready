// 3.  URLify:

// Write a method to replace all spaces in a string with '%20'.
// You may assume that the string has sufficient space at the end to hold the additional characters,
// and that you are given the "true" length of the string.

export default function URLify (s1 : string): string {
    let res: string = ""
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] == " ") {
            res += "%20";
        } else {
            res += s1[i];
        }
    }
    return res
}