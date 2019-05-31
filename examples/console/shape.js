import * as Shape from "../../src/shape";
import * as Fretboard from "../../src/fretboard";
// import {TuningType} from "../../src/TuningType.js";

// console.log(Shape.create("X02210"));

/*
const s = Shape.create({frets: "022100", fingers: "123411"});
console.log(JSON.stringify(s));

const p = Fretboard.play(s, 5, TuningType.guitar.standard);
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


/*
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

console.log(Shape.create());
*/


let u = Shape.create("1 2,0,0,0,0,0");      // [ [ 1, 2 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ] ]
console.log(u.frets);

let v = Shape.remove(u, 0, 1);              // [ [ 2 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ] ]
console.log(v.frets);

u = Shape.create("0,0,0,0,4 3,0");          // [ [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 4, 3 ], [ 0 ] ]
console.log(u.frets);

v = Shape.remove(u, 4, 3);                  // [ [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 4 ], [ 0 ] ]
console.log(v.frets);

u = Shape.create("0x00");                   // [ [ 0 ], [ 'X' ], [ 0 ], [ 0 ] ]
console.log(u.frets);

v = Shape.remove(u, 1, 'X');                // [ [ 0 ], [], [ 0 ], [ 0 ] ]
console.log(v.frets);



// const r = Fretboard.play(Shape.create("0,2,2,1,4 3,0"));
// console.log(r.notes);

/*
// console.log(p.frets === s.frets);   // true because of immer.js

// const q = Shape.play(s, TuningType.guitar.standard, 5);
// console.log(JSON.stringify(q));
//
// const r = Shape.moveToFret(q, 8);
// console.log(JSON.stringify(r));
*/
