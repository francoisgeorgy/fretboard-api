import * as Shape from "../../src/shape";
import {Tuning} from "../../src/Tuning.js";

const s = Shape.create({frets: "022100", fingers: "123411"});
console.log(JSON.stringify(s));

const p = Shape.play(s, Tuning.guitar.standard);
console.log(JSON.stringify(p));

// console.log(p.frets === s.frets);   // true because of immer.js

const q = Shape.play(s, Tuning.guitar.standard, 5);
console.log(JSON.stringify(q));

const r = Shape.moveToFret(q, 8);
console.log(JSON.stringify(r));
