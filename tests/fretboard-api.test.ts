// import DummyClass from "../src/fretboard-api"
import {create, normalizeInputFormat} from "../src/Shape";
// import {normalizeInputFormat} from "../src/utils";

/**
 * Dummy test
 */
/*
describe("Dummy test", () => {
    it("works if true is truthy", () => {
        expect(true).toBeTruthy()
    })

    it("DummyClass is instantiable", () => {
        expect(new DummyClass()).toBeInstanceOf(DummyClass)
    })

    it("Answer is 42", () => {
        expect(DummyClass.getAnswer()).toBe(42)
    })
})
*/

const NON_PLAYED = null;

test('normalizeFretsFormat', () => {
    //TODO: complete test with more input formats, using 'X', '', '-', ",,", ...
    expect(normalizeInputFormat("022100")).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeInputFormat([0, 2, 2, 1, 0, 0])).toEqual([[0], [2], [2], [1], [0], [0]]);
    // expect(normalizeInputFormat(["0", "2", "2", "1", "0", "0"])).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeInputFormat("8 10 10 9 8 8")).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeInputFormat([8, 10, 10, 9, 8, 8])).toEqual([[8], [10], [10], [9], [8], [8]]);
    // expect(normalizeInputFormat(["8", "10", "10", "9", "8", "8"])).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeInputFormat("5X565X")).toEqual([[5], [null], [5], [6], [5], [null]]);
    expect(normalizeInputFormat("5X565X")).toEqual([[5], [NON_PLAYED], [5], [6], [5], [NON_PLAYED]]);
    expect(normalizeInputFormat("5 X 5 6 5 X")).toEqual([[5], [null], [5], [6], [5], [null]]);
    // expect(normalizeInputFormat([5, "X", 5, 6, 5, "X"])).toEqual([[5], ['X'], [5], [6], [5], ['X']]);
    expect(normalizeInputFormat([5, null, 5, 6, 5, null])).toEqual([[5], [null], [5], [6], [5], [null]]);
    expect(normalizeInputFormat("24,124,134,134,24,12")).toEqual([[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]);
    expect(normalizeInputFormat("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8")).toEqual([[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]);
});

/*
test('shape at position 0', () => {
    expect(create("022100")).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        // fingers: undefined,
        root: {string: 0, fret: 0}
    });
});

test('shape at position 8', () => {
    expect(create("8 10 10 9 8 8")).toMatchObject({
        frets: [[8], [10], [10], [9], [8], [8]],
        // fingers: null,
        root: {string: 0, fret: 8}
    });

});

test('shape by object', () => {
    expect(create({frets: "022100", name:"E form"})).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        // fingers: null,
        root: {string: 0, fret: 0}
    });

});
*/
test('shape with two notes only', () => {
    expect(create("3X5")).toMatchObject({
        frets: [[3], [null], [5]],
        // fingers: null,
        root: {string: 0, fret: 3}
    });

});
