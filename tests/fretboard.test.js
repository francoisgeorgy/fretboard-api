import * as Fretboard from "../src/fretboard";
import * as Shape from "../src/shape";
import {Tuning} from "../src/Tuning.js";
/*
test('fretboard', () => {

    expect(Fretboard.note(1, 3)).toEqual('C3');     // C3

    expect(Fretboard.fret('C3', 1)).toEqual(3);
    expect(Fretboard.fret('C',  1)).toEqual(3);
    expect(Fretboard.fret('G2', 1)).toEqual(-2);

    expect(Fretboard.fret(2, 3, 0)).toEqual(1);     // F#

    // fret(string, fret, string)
    expect(Fretboard.fret(0, 8, 1)).toEqual(3);     // 3
    expect(Fretboard.fret(1, 3, 0)).toEqual(8);     // 8
    expect(Fretboard.fret(2, 2, 0)).toEqual(0);     // 8
    expect(Fretboard.fret(2, 3, 0)).toEqual(1);     // 8
    expect(Fretboard.fret(2, 3, 0, 12)).toEqual(13);     // 13

    expect(Fretboard.fret(0, 0, 0)).toEqual(0);
    expect(Fretboard.fret(0, 0, 1)).toEqual(7);
    expect(Fretboard.fret(0, 0, 2)).toEqual(2);
    expect(Fretboard.fret(0, 0, 3)).toEqual(9);
    expect(Fretboard.fret(0, 0, 4)).toEqual(5);
    expect(Fretboard.fret(0, 0, 5)).toEqual(0);

    expect(Fretboard.fret(0, 12, 0)).toEqual(12);
    expect(Fretboard.fret(0, 12, 1)).toEqual(7);
    expect(Fretboard.fret(0, 12, 2)).toEqual(14);
    expect(Fretboard.fret(0, 12, 3)).toEqual(9);
    expect(Fretboard.fret(0, 12, 4)).toEqual(17);
    expect(Fretboard.fret(0, 12, 5)).toEqual(12);

    expect(Fretboard.fret(0, 12, 0, 12)).toEqual(12);
    expect(Fretboard.fret(0, 12, 1, 12)).toEqual(19);
    expect(Fretboard.fret(0, 12, 2, 12)).toEqual(14);
    expect(Fretboard.fret(0, 12, 3, 12)).toEqual(21);
    expect(Fretboard.fret(0, 12, 4, 12)).toEqual(17);
    expect(Fretboard.fret(0, 12, 5, 12)).toEqual(12);

    expect(Fretboard.fret(0, 12, 0)).toEqual(12);
    expect(Fretboard.fret(1, 12, 0)).toEqual(17);
    expect(Fretboard.fret(2, 12, 0)).toEqual(10);
    expect(Fretboard.fret(3, 12, 0)).toEqual(15);
    expect(Fretboard.fret(4, 12, 0)).toEqual(7);
    expect(Fretboard.fret(5, 12, 0)).toEqual(12);

    expect(Fretboard.fretLow(0, 12, 0)).toEqual(12);
    expect(Fretboard.fretLow(1, 12, 0)).toEqual(5);
    expect(Fretboard.fretLow(2, 12, 0)).toEqual(10);
    expect(Fretboard.fretLow(3, 12, 0)).toEqual(3);
    expect(Fretboard.fretLow(4, 12, 0)).toEqual(7);
    expect(Fretboard.fretLow(5, 12, 0)).toEqual(12);

    expect(Fretboard.fretHigh(0, 12, 0)).toEqual(12);
    expect(Fretboard.fretHigh(1, 12, 0)).toEqual(17);
    expect(Fretboard.fretHigh(2, 12, 0)).toEqual(22);
    expect(Fretboard.fretHigh(3, 12, 0)).toEqual(15);
    expect(Fretboard.fretHigh(4, 12, 0)).toEqual(19);
    expect(Fretboard.fretHigh(5, 12, 0)).toEqual(12);

    // expect(Fretboard.fret(3, 0, 3)).toEqual();     // 0
    // expect(Fretboard.fret(15, 0, 3)).toEqual();    // 12
    // expect(Fretboard.fret(3, 12, 0)).toEqual();    // 15
    // expect(Fretboard.fret(3, 24, 0)).toEqual();    // 15
    // expect(Fretboard.fret(3, 24, 0, 0, 48)).toEqual();    // 27
    //
    // expect(Fretboard.interval(0, 0, 1, 0)).toEqual();      // 5
    // expect(Fretboard.interval(0, 0, 5, 0)).toEqual();      // 24
    // expect(Fretboard.interval(0, 8, 1, 8)).toEqual();      // 5
    // expect(Fretboard.interval(0, 8, 3, 1)).toEqual();      // 8
    // expect(Fretboard.interval(0, 5, 1, 7)).toEqual();      // 7
    // expect(Fretboard.interval(1, 0, 0, 0)).toEqual();      // -5

});
*/

test('fretboard tuning', () => {
    expect(Fretboard.computeTuningIntervals()).toEqual([ '1P', '4P', '4P', '4P', '3M', '4P' ]);
    expect(Fretboard.computeTuningPitchClasses()).toEqual([ 'E', 'A', 'D', 'G', 'B', 'E' ]);
    expect(Fretboard.computeTuningIntervals(Tuning.guitar.standard)).toEqual([ '1P', '4P', '4P', '4P', '3M', '4P' ]);
    expect(Fretboard.computeTuningPitchClasses(Tuning.guitar.standard)).toEqual([ 'E', 'A', 'D', 'G', 'B', 'E' ]);
});


test('fretboard play shape', () => {
    expect(Fretboard.play(Fretboard.moveToFret(Shape.create("X32010"), 8))).toMatchObject({
        frets: [[], [8], [7], [5], [6], [5]],
        fingers: null,
        root: {"string": 1, "fret": 8},
        position: 8,
        tuning: Tuning.guitar.standard,
        intervals: [[], ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [[], ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        intervalsSimple: null,
        notesSimple: null
    });

    expect(Fretboard.play(Shape.create("X32010"), 8)).toMatchObject({
        frets: [[], [8], [7], [5], [6], [5]],
        fingers: null,
        root: {"string": 1, "fret": 8},
        position: 8,
        tuning: Tuning.guitar.standard,
        intervals: [[], ["1P"], ["3M"], ["5P"], ["8P"], ["10M"]],
        notes: [[], ["F3"], ["A3"], ["C4"], ["F4"], ["A4"]],
        intervalsSimple: null,
        notesSimple: null
    });

});

/*
test('Fretboard find note', () => {

    expect(Fretboard.find('C')).toEqual({ string: 0, fret: 8, note: 'C3' });
    expect(Fretboard.find('C4')).toEqual({ string: 0, fret: 20, note: 'C4' });
    expect(Fretboard.find('C', {minFret: 10, maxFret: 12})).toEqual({string: 2, fret: 10, note: 'C4'});
    expect(Fretboard.find('C', {fromString: 1, minFret: 8, maxFret: 12})).toEqual({string: 2, fret: 10, note: 'C4'});

});
*/
