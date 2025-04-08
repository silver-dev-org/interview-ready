import { powerSet } from "../../44_powerSet";

function sorted(powerSet: number[][]) {
  return powerSet.map((set) => set.sort()).sort();
}

describe("powerSet", () => {
  test("returns correct power set for a given set", () => {
    const set1 = [1, 2, 3];
    const expectedPowerSet1 = [
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3],
    ];
    expect(sorted(powerSet(set1))).toEqual(sorted(expectedPowerSet1));

    const set2: number[] = [];
    const expectedPowerSet2: number[][] = [[]];
    expect(sorted(powerSet(set2))).toEqual(sorted(expectedPowerSet2));
  });

  test("returns correct power set for 4", () => {
    const set1 = [1, 2, 3, 4];
    const expectedPowerSet1 = [
      [1],
      [1, 4],
      [1, 3, 4],
      [1, 3],
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 4],
      [1, 2],
      [2],
      [2, 4],
      [2, 3, 4],
      [2, 3],
      [3],
      [3, 4],
      [4],
      [],
    ];
    expect(sorted(powerSet(set1))).toEqual(sorted(expectedPowerSet1));
  });
});
