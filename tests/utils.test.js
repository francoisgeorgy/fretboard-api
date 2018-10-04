import {normalizeInputFormat, normalizeFretsPosition} from "../src/utils";
// import {Shape} from "../src/Shape";

test('normalizeFretsFormat', () => {

    //TODO: complete test with more input formats, using 'X', '', '-', ",,", ...

    expect(normalizeInputFormat("022100")).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeInputFormat([0, 2, 2, 1, 0, 0])).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeInputFormat(["0", "2", "2", "1", "0", "0"])).toEqual([[0], [2], [2], [1], [0], [0]]);
    expect(normalizeInputFormat("8 10 10 9 8 8")).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeInputFormat([8, 10, 10, 9, 8, 8])).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeInputFormat(["8", "10", "10", "9", "8", "8"])).toEqual([[8], [10], [10], [9], [8], [8]]);
    expect(normalizeInputFormat("5X565X")).toEqual([[5], ['X'], [5], [6], [5], ['X']]);
    expect(normalizeInputFormat("5 X 5 6 5 X")).toEqual([[5], ['X'], [5], [6], [5], ['X']]);
    expect(normalizeInputFormat([5, "X", 5, 6, 5, "X"])).toEqual([[5], ['X'], [5], [6], [5], ['X']]);
    expect(normalizeInputFormat("24,124,134,134,24,12")).toEqual([[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]);
    expect(normalizeInputFormat("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8")).toEqual([[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]);
});

test('normalizeFretsPosition', () => {
    expect(normalizeFretsPosition([[8], [10], [10], [9], [8], [8]])).toEqual([[0], [2], [2], [1], [0], [0]]);
});

/*
test('translateVerticalBy', () => {
    let s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
    s.translateVerticalBy(2);
    expect(s).toMatchObject({
        frets:
            [ [ 8, 10 ],
                [ 7, 8 ],
                [ 8, 10 ],
                [ 7, 8, 10 ],
                [ 7, 9, 10 ],
                [ 7, 9, 10 ] ],
        // tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        // tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        position: { string: 0, fret: 8 },
        root: { string: 0, fret: 8 },
        intervals:
            [ [ 'R', '2M' ],
                [ '3M', '4P' ],
                [ '7m', '8P' ],
                [ '9M', '10m', '11P' ],
                [ '12d', '13m', '13M' ],
                [ '14M', '16m', '16M' ] ],
        simpleIntervals: [ 'R', '2M', '3M', '4P', '7m', '3m', '5d', '6m', '6M', '7M', '2m' ],
        notes:
            [ [ 'C3', 'D3' ],
                [ 'E3', 'F3' ],
                [ 'Bb3', 'C4' ],
                [ 'D4', 'Eb4', 'F4' ],
                [ 'Gb4', 'Ab4', 'A4' ],
                [ 'Cb5', 'Db5', 'D5' ] ],
        simpleNotes: [ 'C', 'D', 'E', 'F', 'Bb', 'Eb', 'Gb', 'Ab', 'A', 'Cb', 'Db' ] });

    s.translateVerticalBy(-4);
    expect(s).toMatchObject({
        frets:
            [ [ 7, 9, 10 ],
                [ 7, 9, 10 ],
                [ 8, 10 ],
                [ 7, 8 ],
                [ 8, 10 ],
                [ 7, 8, 10 ] ],
        // tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        // tuningIntervals: [ '1P', '4P', '4P', '4P', '3M', '4P' ],
        position: { string: 0, fret: 7 },
        root: { string: 0, fret: 8 },
        intervals:
            [ [ '-2m', '2m', '2M' ],
                [ '3M', '5d', '5P' ],
                [ '7m', '8P' ],
                [ '9M', '10m' ],
                [ '12P', '13M' ],
                [ '14M', '15P', '16M' ] ],
        simpleIntervals: [ '-2m', '2m', '2M', '3M', '5d', '5P', '7m', 'R', '3m', '6M', '7M' ],
        notes:
            [ [ 'B2', 'C#3', 'D3' ],
                [ 'E3', 'F#3', 'G3' ],
                [ 'A#3', 'B#3' ],
                [ 'D4', 'D#4' ],
                [ 'G4', 'A4' ],
                [ 'B4', 'B#4', 'D5' ] ],
        simpleNotes: [ 'B', 'C#', 'D', 'E', 'F#', 'G', 'A#', 'B#', 'D#', 'A' ]});
});
*/
