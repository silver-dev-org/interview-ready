// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export default function stringCompression (str: string) : string {

    let count = 1;
    let result = '';
    for (let i = 0; i <= str.length - 1; i++) {
        if (str[i] === str[i+1]) {
            count++;
        } else {
            result += str[i] + count;
            count = 1;
        }
    }
    return result.length >= str.length ? str : result;
}