// 6. *String Compression*:

// Implement a method to perform basic string compression using the counts of repeated characters.
// For example, the string aabcccccaaa would become a2blc5a3,
// If the "compressed" string would not become smaller than the original string,
// your method should return the original string.
// You can assume the string has only uppercase and lowercase letters (a - z).

export default function stringCompression (str: string) : string {
 if (!str) {
    return "";
 }

 let count = 1;
 let res_compress = "";

 for (let i = 1; i < str.length ; i++) {
    if (str[i] === str[i -1]) {
        count ++;
    } else {
        res_compress += str[i -1] + count.toString();
        count = 1;
    }
 }
 res_compress += str[str.length - 1] + count.toString();

 return res_compress.length < str.length ? res_compress : str;
}