import * as Shape from "../src/shape";

//TODO: add tests for shape that do not use all the strings

test('shape at position 0', () => {

    expect(Shape.create("022100")).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        fingers: null,
        root: {string: 0, fret: 0}
    });

});

test('shape at position 8', () => {

    expect(Shape.create("8 10 10 9 8 8")).toMatchObject({
        frets: [[8], [10], [10], [9], [8], [8]],
        fingers: null,
        root: {string: 0, fret: 8}
    });

});

test('shape by object', () => {

    expect(Shape.create({frets: "022100", name:"E form"})).toMatchObject({
        frets: [[0], [2], [2], [1], [0], [0]],
        fingers: null,
        root: {string: 0, fret: 0}
    });

});

test('shape with two notes only', () => {

    expect(Shape.create("3X5")).toMatchObject({
        frets: [[3], [], [5]],
        fingers: null,
        root: {string: 0, fret: 3}
    });

});

test('add note to shape', () => {

    expect(Shape.add(Shape.create("022100"), 4, 3)).toMatchObject({
        frets: [[3], [], [5]],
        fingers: null,
        root: {string: 0, fret: 3}
    });

});


/*
test('Shape intervals and notes', () => {

    expect(Shape.create("5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5")).toMatchObject({
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

    expect(Shape.create("7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7")).toMatchObject({
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

    expect(Shape.create("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10")).toMatchObject({
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
*/

/*
test('Shape fingers', () => {

    expect(Shape.create({frets: "7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7", fingers:"2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4"})).toMatchObject({
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
*/

/*
test('Shape.moveTo', () => {
    let s = Shape.create("5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5");
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
*/

/*
test('Shape.translateHorizontalBy', () => {
    let s = Shape.create("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8");
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
*/
