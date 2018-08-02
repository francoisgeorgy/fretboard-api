import {Shape} from "../src/Shape";

let s = new Shape({frets:"5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5"});
console.log(s);

s.moveTo({fret:8});
console.log(s);

s.moveTo({fret:0});
console.log(s);

console.log('--------');

s = new Shape({frets:"8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"});
console.log(s);

s.translateHorizontalBy(-3);
console.log(s);

s.translateHorizontalBy(3);
console.log(s);
