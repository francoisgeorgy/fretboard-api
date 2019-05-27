import {Shape} from "../src/Shape";

let s1 = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s1);

console.log('--------');

// let s2 = new Shape({frets:"7 8, 7 8 10, 7 8 10, 7 9 10, 8 10 11, 8 10", root:{string:1, fret:8}});
let s2 = new Shape({frets:"7 8, 7 8 10, 7 8 10, 7 9 10, 8 10 11, 8 10", root:{string:1, fret:8}});
console.log(s2);
