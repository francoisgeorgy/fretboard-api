import {Utils} from "../src/utils";

test('intervals simplification', () => {
    expect(Utils.intervalsSimple([null, ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]])).toEqual(["1P", "3M", "5P"]);
});
