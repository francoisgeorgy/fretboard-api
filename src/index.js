

// quick tests:

/*
                                console.log('--- create Fretboard');
var f = new Fretboard();        console.log(f);
                                console.log('--- add shapes');
var shape1 = f.addShape();      console.log(shape1);
var shape2 = f.addShape();      console.log(shape2);
                                console.log(f);
// f.removeShape(shape1.id);       console.log(f);
// f.removeShape(shape2);          console.log(f);
                                console.log('--- change tuning');
f.setTuning(['D2', 'A2', 'D3', 'G3', 'B3', 'D4']);
                                console.log(shape1);
                                console.log(shape2);
                                console.log(f);
*/

// var s = new Shape({frets:'123', fingers:'234', tuning:DEF_TUNING});
// console.log(s);
//
// var f = new Fretboard();
// console.log(f);
// var shape1 = f.addShape({frets:'123', fingers:'234'});
// console.log(f);
// var shape1 = new Shape({frets:'123', fingers:'234', tuning:DEF_TUNING});
// console.log(shape1);
// shape1.moveTo({fret:8});
// console.log(shape1);

// console.log('---');
// var shape2 = new Shape({frets:'8 10 10 9 8 8', fingers:'1 4 3 2 1 1', tuning:DEF_TUNING});
// console.log(shape2);

// console.log('---');
// // var shape3 = new Shape({frets:'X 3 2 0 1 0', tuning:DEF_TUNING});
// var shape3 = new Shape({frets:'X 12 11 9 10 9', tuning:DEF_TUNING});
// console.log(shape3);

import {Fretboard} from "./fretboard";

var f = new Fretboard();        console.log(f);
// console.log('--- add shapes');
// var shape1 = f.addShape({shape: {frets:'0 2 2 1 0 0'}});
// console.log('shape1', shape1);
console.log('\n--- add shapes');
var shape2 = f.addShape({shape: {frets:'0 2 2 1 0 0'}, fret: 8});
console.log('shape2', shape2);
