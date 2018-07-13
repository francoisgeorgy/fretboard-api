import {normalizeFrets} from "../src/utils";
import {NOT_FRETTED_NUMBER} from "../src/conf";

test('utils', () => {
    expect(normalizeFrets("123")).toEqual([0,1,2]);
    expect(normalizeFrets("1 2 3")).toEqual([0,1,2]);
    expect(normalizeFrets("1,2,3")).toEqual([0,1,2]);
    expect(normalizeFrets([1,2,3])).toEqual([0,1,2]);
    expect(normalizeFrets("X123")).toEqual([NOT_FRETTED_NUMBER,0,1,2]);
    expect(normalizeFrets("X 1 2 3")).toEqual([NOT_FRETTED_NUMBER,0,1,2]);
    expect(normalizeFrets("X,1,2,3")).toEqual([NOT_FRETTED_NUMBER,0,1,2]);
    expect(normalizeFrets([NOT_FRETTED_NUMBER,1,2,3])).toEqual([NOT_FRETTED_NUMBER,0,1,2]);
});
