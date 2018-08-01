import {Shape} from "../src/Shape";

let s = new Shape({frets:"5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5"});
console.log(s);

s.moveTo({fret:8});
console.log(s);

s.moveTo({fret:0});
console.log(s);
