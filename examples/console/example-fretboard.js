import {Fretboard} from "../../src/Fretboard";

let f = new Fretboard();
// console.log(f);

// console.log(f.findNote('C4'));
//
// console.log(f.findNote('C4', 0, 0, 12));
//
// console.log(f.findNote('C4', 0, 0, 5));
//
// console.log(f.findNote('C4', 0, 0, 1));
//
// console.log(f.findNote('C4', 0, 0, 0));


let n = f.find('E');    console.log(n);
while (n) {
    n = f.findNext(n);  console.log(n);
}

// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();

// n = f.find('C', {maxFret: 12});     // if note is specified without octave, than octave will be ignored
// console.log(n);

// let {string, fret} = n;
// console.log(f.findNextNote(n));


