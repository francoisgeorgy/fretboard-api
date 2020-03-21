// import DummyClass from "../src/fretboard-api"
// import {create, Shape.normalizeInputFormat} from "../src/Shape";

// import {Shape.normalizeInputFormat} from "../src/utils";

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

// const NON_PLAYED = null;

import {Fretboard, Shape} from "../src";

describe.skip("shapes", () => {

test('normalizeFretsFormat', () => {
    //TODO: complete test with more input formats, using 'X', '', '-', ",,", ...
    expect(Shape.normalizeInputFormat("022100")).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(Shape.normalizeInputFormat([0, 2, 2, 1, 0, 0])).toEqual([[0], [2], [2], [1], [0], [0]]);
    // expect(Shape.normalizeInputFormat(["0", "2", "2", "1", "0", "0"])).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(Shape.normalizeInputFormat("8 10 10 9 8 8")).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(Shape.normalizeInputFormat([8, 10, 10, 9, 8, 8])).toEqual([[8], [10], [10], [9], [8], [8]]);
    // expect(Shape.normalizeInputFormat(["8", "10", "10", "9", "8", "8"])).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(Shape.normalizeInputFormat("5X565X")).toEqual([[5], null, [5], [6], [5], null]);
    expect(Shape.normalizeInputFormat("5X565X")).toEqual([[5], null, [5], [6], [5], null]);
    expect(Shape.normalizeInputFormat("5 X 5 6 5 X")).toEqual([[5], null, [5], [6], [5], null]);
    // expect(Shape.normalizeInputFormat([5, "X", 5, 6, 5, "X"])).toEqual([[5], ['X'], [5], [6], [5], ['X']]);
    expect(Shape.normalizeInputFormat([5, null, 5, 6, 5, null])).toEqual([[5], null, [5], [6], [5], null]);
    expect(Shape.normalizeInputFormat("24,124,134,134,24,12")).toEqual([[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]);
    expect(Shape.normalizeInputFormat("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8")).toEqual([[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]);
});


test('shape at position 0', () => {
    expect(Shape.create("022100")).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        // fingers: undefined,
        root: {string: 0, fret: 0}
    });
});

test('shape at position 8', () => {
    expect(Shape.create("8 10 10 9 8 8")).toMatchObject({
        frets: [[8], [10], [10], [9], [8], [8]],
        // fingers: null,
        root: {string: 0, fret: 8}
    });

});

test('shape by object', () => {
    expect(Shape.create({frets: "022100", name:"E form"})).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        // fingers: null,
        root: {string: 0, fret: 0}
    });

});

test('shape with two notes only', () => {
    expect(Shape.create("X57X57")).toMatchObject({
        frets: [null, [5], [7], null, [5], [7]],
        // fingers: null,
        root: {string: 1, fret: 5}
    });

});

test('shape with two notes only', () => {
    expect(Shape.create("3X5")).toMatchObject({
        frets: [[3], null, [5]],
        // fingers: null,
        root: {string: 0, fret: 3}
    });

});

test('shape 022100 on fretboard with default tuning', () => {
    const s = Shape.create("022100");
    // console.log("s", s);
    const intervals = Fretboard.intervals(s);
    // console.log("intervals", intervals);
    expect(intervals).toMatchObject([['1P'], ['5P'], ['8P'], ['10M'], ['12P'], ['15P']]);
});

test('shape X57X57 on fretboard with default tuning', () => {
    const s = Shape.create("X57X57");     // {frets: [[null], [5], [7], [null], [5], [7]], root: {string: 1, fret: 5}}
    // console.log("s", s);
    const intervals = Fretboard.intervals(s);   // [[], ['1P'], ['5P'], [], ['9M'], ['13M']]
    // console.log("intervals", intervals);
    expect(intervals).toMatchObject([null, ['1P'], ['5P'], null, ['9M'], ['13M']]);
});

});


/*
test('fretboard play shape', () => {
    expect(Fretboard.play(Fretboard.moveToFret(Shape.create("X32010"), 8))).toMatchObject({
        frets: [['X'], [8], [7], [5], [6], [5]],
        fingers: null,
        root: {"string": 1, "fret": 8},
        position: 8,
        tuning: TuningType.guitar.standard,
        intervals: [[], ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [[], ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        intervalsSimple: null,
        notesSimple: null
    });

    expect(Fretboard.play(create("X32010"), 8)).toMatchObject({
        frets: [['X'], [8], [7], [5], [6], [5]],
        fingers: null,
        root: {"string": 1, "fret": 8},
        position: 8,
        tuning: TuningType.guitar.standard,
        intervals: [[], ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [[], ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        intervalsSimple: null,
        notesSimple: null
    });

});
*/
