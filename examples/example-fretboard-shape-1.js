import {Shape} from "../src/Shape";
import {Fretboard} from "../src/Fretboard";

let f = new Fretboard();
console.log(new Shape({frets:"022100"}, f));

let s = f.addShape({shape: {frets:"022100"}});
console.log(f);
console.log(s);

