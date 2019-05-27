import DummyClass from "../src/fretboard-api"
import {create} from "../src/Shape";

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

test('shape with two notes only', () => {
    expect(create("3X5")).toMatchObject({
        frets: [[3], ['X'], [5]],
        // fingers: null,
        root: {string: 0, fret: 3}
    });

});
