import * as Shape from "../../src/shape";

const s = Shape.create([0, 2, 2, 1, 0, 0]);
console.log(JSON.stringify(s));

const s2 = Shape.create({frets: "022100", fingers: "123411"});
console.log(JSON.stringify(s2));
