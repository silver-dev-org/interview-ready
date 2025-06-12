import stringRotation from "../../09_stringRotation";
import {reassignIsSubstring} from "../../__utils__/strings";

describe("09 - stringRotation", () => {
  beforeEach(() => {
    reassignIsSubstring()
  })

  test("rotates a string", () => {
    const str1 = "Hello";
    const str2 = "oHell";
    const result = stringRotation(str1, str2);
    expect(result).toEqual(true);
  });

  test("rotates another string", () => {
    const str1 = "waterbottle";
    const str2 = "erbottlewat";
    const result = stringRotation(str1, str2);
    expect(result).toEqual(true);
  });
});
