import {Fretboard} from "../../src/Fretboard";

let f = new Fretboard();
// console.log(f);

console.log('C', f.find('C'));
console.log('C4', f.find('C4'));
console.log('C4, 0, 0, 5', f.find('C4', {minFret: 5}));
console.log('C4, 0, 0, 12', f.find('C4', {minFret: 12}));
console.log('C, max fret 2', f.find('C', {maxFret: 2}));

console.log('C, 8..12', f.find('C', {minFret: 8, maxFret: 12}));
console.log('C, 10..12', f.find('C', {minFret: 10, maxFret: 12}));
console.log('C, 1, 8..12', f.find('C', {fromString: 1, minFret: 8, maxFret: 12}));

/*
let n = f.find('E');    console.log(n);
while (n) {
    n = f.findNext(n);  console.log(n);
}
*/
// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();
// n = f.findNext(n);      console.log(n); console.log();

// n = f.find('C', {maxFret: 12});     // if note is specified without octave, than octave will be ignored
// console.log(n);

// let {string, fret} = n;
// console.log(f.findNextNote(n));


