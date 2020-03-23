import {Fretboard, Shape, Tuning} from "../src";

describe("fretboard", () => {

test('fretboard tuning', () => {
    expect(Fretboard.computeTuningIntervals()).toEqual([ '1P', '4P', '4P', '4P', '3M', '4P' ]);
    expect(Fretboard.computeTuningPitchClasses()).toEqual([ 'E', 'A', 'D', 'G', 'B', 'E' ]);
    expect(Fretboard.computeTuningIntervals(Tuning.guitar.standard)).toEqual([ '1P', '4P', '4P', '4P', '3M', '4P' ]);
    expect(Fretboard.computeTuningPitchClasses(Tuning.guitar.standard)).toEqual([ 'E', 'A', 'D', 'G', 'B', 'E' ]);
});

test('fretboard play shape X32010 at fret 8', () => {

    //TODO: if we create then play, do we want to update the position?

    // create + play : position updated or not updated ? --> updated because when we play we define intervals, notes, etc...
    // create + moveToFret + play : position updated

    expect(Fretboard.play(Shape.create("X32010"), 8)).toMatchObject({
        frets: [null, [8], [7], [5], [6], [5]],
        // fingers: null,
        root: {"string": 1, "fret": 8},
        position: {"string": 1, "fret": 8},
        tuning: Tuning.guitar.standard,
        intervals: [null, ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [null, ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        // intervalsSimple: null,
        // notesSimple: null
    });
});

test('fretboard play shape', () => {
    expect(Fretboard.play(Fretboard.moveToFret(Shape.create("X32010"), 8))).toMatchObject({
        frets: [null, [8], [7], [5], [6], [5]],
        // fingers: null,
        root: {"string": 1, "fret": 8},
        position: {"string": 1, "fret": 8},
        tuning: Tuning.guitar.standard,
        intervals: [null, ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [null, ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        // intervalsSimple: null,
        // notesSimple: null
    });
});

test('fretboard play all frets', () => {
    expect(Fretboard.play(Fretboard.moveToFret(Shape.create("12345,12345,12345,12345,12345,12345"), 1))).toMatchObject({
        frets: [
            [1,2,3,4,5],
            [1,2,3,4,5],
            [1,2,3,4,5],
            [1,2,3,4,5],
            [1,2,3,4,5],
            [1,2,3,4,5]
        ],
        // fingers: null,
        root: {"string": 0, "fret": 1},
        position: {"string": 0, "fret": 1},
        tuning: Tuning.guitar.standard,
        intervals: [
            ["1P","2m","2M","3m","3M"],
            ["4P","5d","5P","6m","6M"],
            ["7m","7M","8P","9m","9M"],
            ["10m","10M","11P","12d","12P"],
            ["12P","13m","13M","14m","14M"],
            ["15P","16m","16M","17m","17M"]],
        notes: [
            ["F2","Gb2","G2","Ab2","A2"],
            ["Bb2","B2","C3","Db3","D3"],   //Cb instead of B
            ["Eb3","E3","F3","Gb3","G3"],
            ["Ab3","A3","Bb3","B3","C4"],
            ["C4","Db4","D4","Eb4","E4"],
            ["F4","Gb4","G4","Ab4","A4"]],
        // intervalsSimple: null,
        // notesSimple: null
    });
});

});
