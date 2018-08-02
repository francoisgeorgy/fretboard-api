import {Shape} from "../src/Shape";

let s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s);
// console.log(s.frets);
// console.log(s.intervals);

console.log();

s.transposeVertical(1);

console.log();

console.log(s);
// console.log(s.frets);
// console.log(s.intervals);
