import {Shape} from "../src/Shape";

// let s = new Shape({frets:"1 2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4", root:{string: 0, fret: 2}});
// let s = new Shape({frets:"8 10 10 9 8 8"});
let s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10"});

console.log('0');
console.log(s.root);
console.log(s.frets);
console.log(s.intervals);
console.log(s.simpleIntervals);
console.log(s.simpleNotes);
console.log();

// s.transposeVertical(3);
// console.log(s.frets);
// console.log(s.intervals);
// console.log();

s.transposeByStrings(1);
console.log('+1');
console.log(s.root);
console.log(s.frets);
console.log(s.intervals);
console.log(s.simpleIntervals);
console.log(s.simpleNotes);
console.log();
/*
s.transposeByStrings(1);
console.log('+1');
console.log(s.root);
console.log(s.frets);
console.log(s.intervals);
console.log();

s.transposeByStrings(-1);
console.log('-1');
console.log(s.root);
console.log(s.frets);
console.log(s.intervals);
console.log();

s.transposeByStrings(-1);
console.log('-1');
console.log(s.root);
console.log(s.frets);
console.log(s.intervals);
console.log();
*/
