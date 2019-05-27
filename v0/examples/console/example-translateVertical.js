import {Shape} from "../src/Shape";

// let s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
let s = new Shape({frets:"8 10 10 9 8 8"});
console.log(s);

console.log();

s.translateVerticalBy(1);

console.log();

console.log(s);
// console.log(s.frets);
// console.log(s.intervals);
