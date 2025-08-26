// 9. *String Rotation*;

import { isSubstring } from './__utils__/strings';

// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring.
// [e.g., "waterbottle" is a rotation of 'erbottlewat")

// export default function stringRotation(s1: string, s2: string): boolean {
// 	if (s1.length !== s2.length) {
// 		return false;
// 	}
// 	if (s1.length === 0) {
// 		return true;
// 	}
// 	Esto siento que debería andar. Solo se llama una vez dentro de la función pero no pasa los test ya que figura que se llamo más de una vez (se llama 1 por cada test)
// 	return isSubstring(s1 + s1, s2);
// }

export default function stringRotation(s1: string, s2: string): boolean {
	let rotated = s2;
	for (let i = 0; i < s1.length; i++) {
		if (rotated === s1) return true;
		rotated = rotated.slice(1, s2.length) + rotated[0];
	}

	return false;
}
