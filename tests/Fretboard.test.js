import {Fretboard} from "../src/Fretboard";

let f;

beforeAll(() => {
    f = new Fretboard();
});

test('Fretboard', () => {

    expect(f.note(1, 3)).toEqual('C3');     // C3

    expect(f.fret('C3', 1)).toEqual(3);
    expect(f.fret('C',  1)).toEqual(3);
    expect(f.fret('G2', 1)).toEqual(-2);

    expect(f.fret(2, 3, 0)).toEqual(1);     // F#

    // fret(string, fret, string)
    expect(f.fret(0, 8, 1)).toEqual(3);     // 3
    expect(f.fret(1, 3, 0)).toEqual(8);     // 8
    expect(f.fret(2, 2, 0)).toEqual(0);     // 8
    expect(f.fret(2, 3, 0)).toEqual(1);     // 8
    expect(f.fret(2, 3, 0, 12)).toEqual(13);     // 13

    expect(f.fret(0, 0, 0)).toEqual(0);
    expect(f.fret(0, 0, 1)).toEqual(7);
    expect(f.fret(0, 0, 2)).toEqual(2);
    expect(f.fret(0, 0, 3)).toEqual(9);
    expect(f.fret(0, 0, 4)).toEqual(5);
    expect(f.fret(0, 0, 5)).toEqual(0);

    expect(f.fret(0, 12, 0)).toEqual(12);
    expect(f.fret(0, 12, 1)).toEqual(7);
    expect(f.fret(0, 12, 2)).toEqual(14);
    expect(f.fret(0, 12, 3)).toEqual(9);
    expect(f.fret(0, 12, 4)).toEqual(17);
    expect(f.fret(0, 12, 5)).toEqual(12);

    expect(f.fret(0, 12, 0, 12)).toEqual(12);
    expect(f.fret(0, 12, 1, 12)).toEqual(19);
    expect(f.fret(0, 12, 2, 12)).toEqual(14);
    expect(f.fret(0, 12, 3, 12)).toEqual(21);
    expect(f.fret(0, 12, 4, 12)).toEqual(17);
    expect(f.fret(0, 12, 5, 12)).toEqual(12);

    expect(f.fret(0, 12, 0)).toEqual(12);
    expect(f.fret(1, 12, 0)).toEqual(17);
    expect(f.fret(2, 12, 0)).toEqual(10);
    expect(f.fret(3, 12, 0)).toEqual(15);
    expect(f.fret(4, 12, 0)).toEqual(7);
    expect(f.fret(5, 12, 0)).toEqual(12);

    expect(f.fretLow(0, 12, 0)).toEqual(12);
    expect(f.fretLow(1, 12, 0)).toEqual(5);
    expect(f.fretLow(2, 12, 0)).toEqual(10);
    expect(f.fretLow(3, 12, 0)).toEqual(3);
    expect(f.fretLow(4, 12, 0)).toEqual(7);
    expect(f.fretLow(5, 12, 0)).toEqual(12);

    expect(f.fretHigh(0, 12, 0)).toEqual(12);
    expect(f.fretHigh(1, 12, 0)).toEqual(17);
    expect(f.fretHigh(2, 12, 0)).toEqual(22);
    expect(f.fretHigh(3, 12, 0)).toEqual(15);
    expect(f.fretHigh(4, 12, 0)).toEqual(19);
    expect(f.fretHigh(5, 12, 0)).toEqual(12);

    // expect(f.fret(3, 0, 3)).toEqual();     // 0
    // expect(f.fret(15, 0, 3)).toEqual();    // 12
    // expect(f.fret(3, 12, 0)).toEqual();    // 15
    // expect(f.fret(3, 24, 0)).toEqual();    // 15
    // expect(f.fret(3, 24, 0, 0, 48)).toEqual();    // 27
    //
    // expect(f.interval(0, 0, 1, 0)).toEqual();      // 5
    // expect(f.interval(0, 0, 5, 0)).toEqual();      // 24
    // expect(f.interval(0, 8, 1, 8)).toEqual();      // 5
    // expect(f.interval(0, 8, 3, 1)).toEqual();      // 8
    // expect(f.interval(0, 5, 1, 7)).toEqual();      // 7
    // expect(f.interval(1, 0, 0, 0)).toEqual();      // -5

});
