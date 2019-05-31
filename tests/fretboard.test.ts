import {Fretboard, Shape, Tuning} from "../src";

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
