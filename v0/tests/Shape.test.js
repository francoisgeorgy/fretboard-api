import {Shape} from "../src/Shape";

//TODO: add tests for shape that do not use all the strings

test('Shape by string', () => {

    expect(new Shape("022100")).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        position: {string: 0, fret: 0},
        root: {string: 0, fret: 0},
        chromas: [[0], [7], [0], [4], [7], [0]],
        intervals: [['1P'], ['5P'], ['8P'], ['10M'], ['12P'], ['15P']],
        simpleIntervals: ['1P', '5P', '3M'],
        notes: [['E2'], ['B2'], ['E3'], ['G#3'], ['B3'], ['E4']],
        simpleNotes: ['E', 'B', 'G#']
    });

    expect(new Shape("8 10 10 9 8 8")).toMatchObject({
        frets: [[8], [10], [10], [9], [8], [8]],
        position: {string: 0, fret: 8},
        root: {string: 0, fret: 8},
        chromas: [[0], [7], [0], [4], [7], [0]],
        intervals: [['1P'], ['5P'], ['8P'], ['10M'], ['12P'], ['15P']],
        simpleIntervals: ['1P', '5P', '3M'],
        notes: [['C3'], ['G3'], ['C4'], ['E4'], ['G4'], ['C5']],
        simpleNotes: ['C', 'G', 'E']
    });

    const s = {
        frets: [[5], [], [5], [6], [5], []],
        position: {string: 0, fret: 5},
        root: {string: 0, fret: 5},
        chromas: [[0], [], [10], [4], [7], []],
        intervals:  [["1P"], [], ["7m"], ["10M"], ["12P"], []],
        simpleIntervals: ['1P', '7m', '3M', '5P'],
        notes: [['A2'], [], ['G3'], ['C#4'], ['E4'], []],
        simpleNotes: ['A', 'G', 'C#', 'E']
    };

    // test frets format:

    //TODO: remove redondant tests; frets format is already tested in utils.test.js

    expect(new Shape("5X565X")).toMatchObject(s);
    expect(new Shape("5 X 5 6 5 X")).toMatchObject(s);
    expect(new Shape("5,X,5,6,5,X")).toMatchObject(s);
    expect(new Shape("5, X, 5, 6, 5, X")).toMatchObject(s);
    expect(new Shape(['5', 'X', '5', '6', '5', 'X'])).toMatchObject(s);
    expect(new Shape([5, 'X', 5, 6, 5, 'X'])).toMatchObject(s);

    //TODO: test fret format with more than one played note per string

});


test('Shape by object', () => {

    expect(new Shape({frets: "022100", name:"E form"})).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        position: {string: 0, fret: 0},
        root: {string: 0, fret: 0},
        chromas: [[0], [7], [0], [4], [7], [0]],
        intervals: [['1P'], ['5P'], ['8P'], ['10M'], ['12P'], ['15P']],
        simpleIntervals: ['1P', '5P', '3M'],
        notes: [['E2'], ['B2'], ['E3'], ['G#3'], ['B3'], ['E4']],
        simpleNotes: ['E', 'B', 'G#']
    });

});


test('Shape intervals and notes', () => {

    expect(new Shape("5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5")).toMatchObject({
        intervals: [['1P', '2M'],
            ['3M', '4P', '5P'],
            ['6M', '7M', '8P'],
            ['9M', '10M', '11P'],
            ['12P', '13M'],
            ['14M', '15P']],
        simpleIntervals: ['1P', '2M', '3M', '4P', '5P', '6M', '7M'],
        notes:
            [['A2', 'B2'],
                ['C#3', 'D3', 'E3'],
                ['F#3', 'G#3', 'A3'],
                ['B3', 'C#4', 'D4'],
                ['E4', 'F#4'],
                ['G#4', 'A4']],
        simpleNotes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
    });

    expect(new Shape("7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7")).toMatchObject({
        intervals:
            [['1P', '2M'],
                ['3M', '4P', '5P'],
                ['6M', '7M', '8P'],
                ['9M', '10M', '11P'],
                ['12P', '13M'],
                ['14M', '15P']],
        simpleIntervals: ['1P', '2M', '3M', '4P', '5P', '6M', '7M'],
        notes:
            [['B2', 'C#3'],
                ['D#3', 'E3', 'F#3'],
                ['G#3', 'A#3', 'B3'],
                ['C#4', 'D#4', 'E4'],
                ['F#4', 'G#4'],
                ['A#4', 'B4']],
        simpleNotes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
    });

    expect(new Shape("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10")).toMatchObject({
        intervals:
            [['1P', '2M'],
                ['3M', '4P', '5P'],
                ['6M', '7M', '8P'],
                ['9M', '10M', '11P'],
                ['12P', '13M'],
                ['14M', '15P', '16M']],
        simpleIntervals: ['1P', '2M', '3M', '4P', '5P', '6M', '7M'],
        notes:
            [['C3', 'D3'],
                ['E3', 'F3', 'G3'],
                ['A3', 'B3', 'C4'],
                ['D4', 'E4', 'F4'],
                ['G4', 'A4'],
                ['B4', 'C5', 'D5']],
        simpleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    });

});




test('Shape fingers', () => {

    expect(new Shape({frets: "7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7", fingers:"2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4"})).toMatchObject({
        frets:
            [[7, 9],
                [6, 7, 9],
                [6, 8, 9],
                [6, 8, 9],
                [7, 9],
                [6, 7]],
        fingers:
            [[2, 4],
                [1, 2, 4],
                [1, 3, 4],
                [1, 3, 4],
                [2, 4],
                [1, 2, 4]],
        intervals:
            [['1P', '2M'],
                ['3M', '4P', '5P'],
                ['6M', '7M', '8P'],
                ['9M', '10M', '11P'],
                ['12P', '13M'],
                ['14M', '15P']],
        simpleIntervals: ['1P', '2M', '3M', '4P', '5P', '6M', '7M'],
        notes:
            [['B2', 'C#3'],
                ['D#3', 'E3', 'F#3'],
                ['G#3', 'A#3', 'B3'],
                ['C#4', 'D#4', 'E4'],
                ['F#4', 'G#4'],
                ['A#4', 'B4']],
        simpleNotes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']

    });

});

test('Shape.moveTo', () => {
    let s = new Shape("5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5");
    s.moveToFret(8);
    expect(s).toMatchObject({
        frets:
            [ [ 8, 10 ],
                [ 7, 8, 10 ],
                [ 7, 9, 10 ],
                [ 7, 9, 10 ],
                [ 8, 10 ],
                [ 7, 8 ] ],
        // tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        // tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        position: { string: 0, fret: 8 },
        root: { string: 0, fret: 8 },
        intervals:
            [ [ '1P', '2M' ],
                [ '3M', '4P', '5P' ],
                [ '6M', '7M', '8P' ],
                [ '9M', '10M', '11P' ],
                [ '12P', '13M' ],
                [ '14M', '15P' ] ],
        simpleIntervals: [ '1P', '2M', '3M', '4P', '5P', '6M', '7M' ],
        notes:
            [ [ 'C3', 'D3' ],
                [ 'E3', 'F3', 'G3' ],
                [ 'A3', 'B3', 'C4' ],
                [ 'D4', 'E4', 'F4' ],
                [ 'G4', 'A4' ],
                [ 'B4', 'C5' ] ],
        simpleNotes: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ] });
});

test('Shape.translateHorizontalBy', () => {
    let s = new Shape("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8");
    s.translateHorizontalBy(-3);
    expect(s).toMatchObject({
        frets:
            [ [ 5, 7 ],
                [ 4, 5, 7 ],
                [ 4, 6, 7 ],
                [ 4, 6, 7 ],
                [ 5, 7 ],
                [ 4, 5 ] ],
        position: { string: 0, fret: 5 },
        root: { string: 0, fret: 5 },
        intervals:
            [ [ '1P', '2M' ],
                [ '3M', '4P', '5P' ],
                [ '6M', '7M', '8P' ],
                [ '9M', '10M', '11P' ],
                [ '12P', '13M' ],
                [ '14M', '15P' ] ],
        simpleIntervals: [ '1P', '2M', '3M', '4P', '5P', '6M', '7M' ],
        notes:
            [ [ 'A2', 'B2' ],
                [ 'C#3', 'D3', 'E3' ],
                [ 'F#3', 'G#3', 'A3' ],
                [ 'B3', 'C#4', 'D4' ],
                [ 'E4', 'F#4' ],
                [ 'G#4', 'A4' ] ],
        simpleNotes: [ 'A', 'B', 'C#', 'D', 'E', 'F#', 'G#' ] });

    s.translateHorizontalBy(3);
    expect(s).toMatchObject({
        frets:
            [ [ 8, 10 ],
                [ 7, 8, 10 ],
                [ 7, 9, 10 ],
                [ 7, 9, 10 ],
                [ 8, 10 ],
                [ 7, 8 ] ],
        position: { string: 0, fret: 8 },
        root: { string: 0, fret: 8 },
        intervals:
            [ [ '1P', '2M' ],
                [ '3M', '4P', '5P' ],
                [ '6M', '7M', '8P' ],
                [ '9M', '10M', '11P' ],
                [ '12P', '13M' ],
                [ '14M', '15P' ] ],
        simpleIntervals: [ '1P', '2M', '3M', '4P', '5P', '6M', '7M' ],
        notes:
            [ [ 'C3', 'D3' ],
                [ 'E3', 'F3', 'G3' ],
                [ 'A3', 'B3', 'C4' ],
                [ 'D4', 'E4', 'F4' ],
                [ 'G4', 'A4' ],
                [ 'B4', 'C5' ] ],
        simpleNotes: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ]});
});

