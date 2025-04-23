// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export default function isUnique(str: string): boolean {
    const arr= str.split('');
    for (let i=0; i<=arr.length - 1; i++) {
        for (let si = i + 1; si <= arr.length - 1; si++) {
            if (arr[i] === arr[si]) {
                return false;
            }
        }
    }

    return true;
}
