import * as Shape from "../../src/shape";
import * as Fretboard from "../../src/fretboard";
// import {Tuning} from "../../src/Tuning.js";

// console.log(Shape.create("X02210"));

/*
const s = Shape.create({frets: "022100", fingers: "123411"});
console.log(JSON.stringify(s));

const p = Fretboard.play(s, 5, Tuning.guitar.standard);
console.log(JSON.stringify(p));

const r = Fretboard.play(Shape.create("022100"));
console.log(JSON.stringify(r));
*/


/*
const q = Fretboard.play(Fretboard.moveToFret(Shape.create("X32010"), 8));
console.log(JSON.stringify(q));
*/

/*
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


*/

console.log(Shape.create(""));
console.log(Shape.add(Shape.create(""), 4, 3));


let s = Shape.create("022100");
let q = Shape.add(s, 4, 3);

console.log(s);
console.log(q);

console.log(s.root === q.root); // true, the root has not changed


let t = Shape.create("022100");
let u = Shape.add(s, 0, 3);

console.log(t);
console.log(u);

console.log(t.root === u.root); // false, the root has changed


/*
// console.log(p.frets === s.frets);   // true because of immer.js

// const q = Shape.play(s, Tuning.guitar.standard, 5);
// console.log(JSON.stringify(q));
//
// const r = Shape.moveToFret(q, 8);
// console.log(JSON.stringify(r));
*/
