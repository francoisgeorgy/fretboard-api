import {Distance, Interval} from "tonal";

const T = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

// arguments order: always string first, fret second

function note(string, fret) {
    let d = Distance.transpose(T[string], Interval.fromSemitones(fret))
    console.log(`note(${string}, ${fret}) = ${d}`);
    return d;
}

function fret() {
    if (arguments.length === 2) {
        let note = arguments[0];
        let string = arguments[1];
        return Distance.semitones(T[string], note);
    }
    if (arguments.length > 2) {
        let fromString = arguments[0];
        let fromFret = arguments[1];
        let toString = arguments[2];
        let minFret = arguments.length > 3 ? arguments[3] : 0;
        let maxFret = arguments.length > 4 ? arguments[4] : 24;
        console.log(minFret, maxFret);
        let f = fret(note(fromString, fromFret), toString);

        //TODO: try to simplify the following corrections:

        while (f < minFret) f += 12;

        console.log(`f=${f} from=${fromFret}`);

        while (
            (f >= minFret) &&
            (
                ((Math.abs(f - fromFret) > 0) && (f >= (minFret + 12))) ||
                (f > maxFret))
            ) f -= 12;

        if ((f < (fromFret - 6)) && (maxFret >= (f+12))) f += 12;

        while (
            (
                (fromFret - f) > 12) ||
            (f < minFret)
            ) f += 12;

        return f;
    }
    throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
}

function interval(fromString, fromFret, toString, toFret) {
    return Distance.semitones(T[fromString], T[toString]) + toFret - fromFret;
}

// console.log(note(1, 3));        // C3
// console.log(fret('C3', 1));     // 3
// console.log(fret('C',  1));     // 3
// console.log(fret('G2', 1));     // -2

console.log(fret(0, 8, 1));     // 3
// console.log(fret(1, 3, 0));     // 8
// console.log(fret(2, 3, 0));     // 1
// console.log(fret(2, 3, 0, 12));     // 13
// console.log(fret(3, 1, 3));     // 5
// console.log(fret(3, 0, 3));     // 0
// console.log(fret(15, 0, 3));    // 12
// console.log(fret(3, 12, 0));    // 15
// console.log(fret(3, 24, 0));    // 15
// console.log(fret(3, 24, 0, 0, 48));    // 27

// console.log(interval(0, 0, 1, 0));      // 5
// console.log(interval(0, 0, 5, 0));      // 24
// console.log(interval(0, 8, 1, 8));      // 5
// console.log(interval(0, 8, 3, 1));      // 8
// console.log(interval(0, 5, 1, 7));      // 7
// console.log(interval(1, 0, 0, 0));      // -5







