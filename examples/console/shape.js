import * as Shape from "../../src/shape";
import * as Fretboard from "../../src/fretboard";
// import {Tuning} from "../../src/Tuning.js";

/*
const s = Shape.create({frets: "022100", fingers: "123411"});
console.log(JSON.stringify(s));

const p = Fretboard.play(s, 5, Tuning.guitar.standard);
console.log(JSON.stringify(p));

const r = Fretboard.play(Shape.create("022100"));
console.log(JSON.stringify(r));
*/


const q = Fretboard.play(Fretboard.moveToFret(Shape.create("X32010"), 8));
console.log(JSON.stringify(q));

const r = Fretboard.play(Shape.create("X32010"), 8);
console.log(JSON.stringify(r));


console.log(Shape.add(Shape.create("022100"), 4, 3));

console.log(Shape.add(Shape.create("0221X0"), 4, 3));

console.log(Shape.add(Shape.create("02"), 4, 3));

console.log(Shape.replace(Shape.create("022100"), 4, 3));

console.log(Shape.replace(Shape.create("022100"), 4, null));

console.log(Shape.replace(Shape.create("022100"), 4, ''));

console.log(Shape.replace(Shape.create("022100"), 4, '-'));

console.log(Shape.replace(Shape.create("022100"), 4, 'x'));

// console.log(Shape.replace(Shape.create("022100"), 4, 'qwe'));

console.log(Shape.replace(Shape.create("022100"), 4));

console.log(Shape.compact(Shape.create("0-0---")));     // [ [ 0 ], [], [ 0 ] ],


// console.log(p.frets === s.frets);   // true because of immer.js

// const q = Shape.play(s, Tuning.guitar.standard, 5);
// console.log(JSON.stringify(q));
//
// const r = Shape.moveToFret(q, 8);
// console.log(JSON.stringify(r));
