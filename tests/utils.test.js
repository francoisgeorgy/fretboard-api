import {normalizeFretsFormat, normalizeFretsPosition} from "../src/utils";
import {NOT_FRETTED_NUMBER} from "../src/conf";
import {Shape} from "../src/Shape";

test('normalizeFretsFormat', () => {
    expect(normalizeFretsFormat("022100")).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeFretsFormat("8 10 10 9 8 8")).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeFretsFormat("5X565X")).toEqual([[5], [], [5], [6], [5], []]);
    expect(normalizeFretsFormat("5 X 5 6 5 X")).toEqual([[5], [], [5], [6], [5], []]);
    expect(normalizeFretsFormat("24,124,134,134,24,12")).toEqual([[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]);
    expect(normalizeFretsFormat("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8")).toEqual([[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]);

    // expect(normalizeFretsPosition([8, 10, 10, 9, 8, 8])).toEqual([0, 2, 2, 1, 0, 0]);
});

test('normalizeFretsPosition', () => {
    expect(normalizeFretsPosition([[8], [10], [10], [9], [8], [8]])).toEqual([[0], [2], [2], [1], [0], [0]]);
});

test('Shapes', () => {

    expect(new Shape({frets:"022100"})).toEqual({
        frets: [ [ 0 ], [ 2 ], [ 2 ], [ 1 ], [ 0 ], [ 0 ] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 0 },
        intervals:
            [ [ 'R' ], [ '5P' ], [ '8P' ], [ '10M' ], [ '12P' ], [ '15P' ] ],
        simpleIntervals: [ 'R', '5P', '3M' ],
        notes:
            [ [ 'E2' ], [ 'B2' ], [ 'E3' ], [ 'Ab3' ], [ 'Cb4' ], [ 'Fb4' ] ],
        simpleNotes: [ 'E', 'B', 'Ab', 'Cb', 'Fb' ] });

    expect(new Shape({frets:"8 10 10 9 8 8"})).toEqual({
        frets: [ [ 8 ], [ 10 ], [ 10 ], [ 9 ], [ 8 ], [ 8 ] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 8 },
        intervals:
            [ [ 'R' ], [ '5P' ], [ '8P' ], [ '10M' ], [ '12P' ], [ '15P' ] ],
        simpleIntervals: [ 'R', '5P', '3M' ],
        notes:
            [ [ 'C3' ], [ 'G3' ], [ 'C4' ], [ 'E4' ], [ 'G4' ], [ 'C5' ] ],
        simpleNotes: [ 'C', 'G', 'E' ] });

    expect(new Shape({frets:"5X565X"})).toEqual({
        frets: [ [ 5 ], [], [ 5 ], [ 6 ], [ 5 ], [] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 5 },
        intervals: [ [ 'R' ], [ '7m' ], [ '10M' ], [ '12P' ] ],
        simpleIntervals: [ 'R', [], '7m', '3M', '5P', [] ],
        notes: [ [ 'A2' ], [], [ 'G3' ], [ 'Db4' ], [ 'Fb4' ], [] ],
        simpleNotes: [ 'A', 'G', 'Db', 'Fb' ] });

    expect(new Shape({frets:"5 X 5 6 5 X"})).toEqual({
        frets: [ [ 5 ], [], [ 5 ], [ 6 ], [ 5 ], [] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 5 },
        intervals: [ [ 'R' ], [ '7m' ], [ '10M' ], [ '12P' ] ],
        simpleIntervals: [ 'R', [], '7m', '3M', '5P', [] ],
        notes: [ [ 'A2' ], [], [ 'G3' ], [ 'Db4' ], [ 'Fb4' ], [] ],
        simpleNotes: [ 'A', 'G', 'Db', 'Fb' ] });

    expect(new Shape({frets:"24,124,134,134,24,12"})).toEqual({
        frets:
            [ [ 2, 4 ],
                [ 1, 2, 4 ],
                [ 1, 3, 4 ],
                [ 1, 3, 4 ],
                [ 2, 4 ],
                [ 1, 2 ] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 2 },
        intervals:
            [ [ 'R', '2M' ],
                [ '3M', '4P', '5P' ],
                [ '6M', '7M', '8P' ],
                [ '9M', '10M', '11P' ],
                [ '12P', '13M' ],
                [ '14M', '15P' ] ],
        simpleIntervals: [ 'R', '2M', '3M', '4P', '5P', '6M', '7M' ],
        notes:
            [ [ 'F#2', 'G#2' ],
                [ 'A#2', 'B2', 'C#3' ],
                [ 'D#3', 'E#3', 'F#3' ],
                [ 'G#3', 'A#3', 'B3' ],
                [ 'C#4', 'D#4' ],
                [ 'E#4', 'F#4' ] ],
        simpleNotes: [ 'F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#' ] });

    expect(new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"})).toEqual({
        frets:
            [ [ 8, 10 ],
                [ 7, 8, 10 ],
                [ 7, 9, 10 ],
                [ 7, 9, 10 ],
                [ 8, 10 ],
                [ 7, 8 ] ],
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        root: { string: 0, fret: 8 },
        intervals:
            [ [ 'R', '2M' ],
                [ '3M', '4P', '5P' ],
                [ '6M', '7M', '8P' ],
                [ '9M', '10M', '11P' ],
                [ '12P', '13M' ],
                [ '14M', '15P' ] ],
        simpleIntervals: [ 'R', '2M', '3M', '4P', '5P', '6M', '7M' ],
        notes:
            [ [ 'C3', 'D3' ],
                [ 'E3', 'F3', 'G3' ],
                [ 'A3', 'B3', 'C4' ],
                [ 'D4', 'E4', 'F4' ],
                [ 'G4', 'A4' ],
                [ 'B4', 'C5' ] ],
        simpleNotes: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ] });




});
