import {Shape} from "../src/Shape";

let s = new Shape({frets:"7 8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10", root:{string: 0, fret: 8}});
// let s = new Shape({frets:"1 2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4", root:{string: 0, fret: 2}});
// let s = new Shape({frets:"8 10 10 9 8 8"});

console.log(s.frets);
console.log(s.intervals);
console.log();

// /for (let i = 0; i < 5; i++) {
//     s.transposeVertical(1);
    s.transposeV(1);
    console.log(s.frets);
    console.log(s.intervals);
    console.log();
// }

// The last iteration must be equal to the start
