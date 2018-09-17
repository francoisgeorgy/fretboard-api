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

let n = f.findNote('C', 0, 0, 12);

console.log(n);
let {string, fret} = n;
console.log(f.findNextNote(string, fret));