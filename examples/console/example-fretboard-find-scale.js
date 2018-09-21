import {Fretboard} from "../../src/Fretboard";
import {Scale, Note, Distance} from "tonal";
import * as Key from "tonal-key";

let f = new Fretboard();

// let scale = Key.scale("C major");
// console.log(scale);

let notes = Scale.notes("A", "major");
console.log(notes);

let intervals = Scale.intervals("major");
console.log(intervals);

let note = Note.from({oct: 2}, "C");
console.log(note, Note.name(note));

let n = note;
let k = 0;
let c = 0;
while (c < 20) {
    let d = Distance.transpose(n, intervals[k % intervals.length]);
    console.log(k, d);
    k = (k + 1) % intervals.length;
    if (k === 0) {
        n = Distance.transpose(n, "8P");
    }
    c++;
}

/*
for (let i of intervals) {
    // let n = Distance.transpose(note, i);
    let n = Distance.transpose("A2", i);
    console.log(i, n);

    console.log(f.find(Note.name(n), {
        fromString: 0,
        fromFret: 5,
        minFret: 4,
        maxFret: 8
    }));

    //TODO: do more than one octave

}
*/



//
// let n = f.find('E');    console.log(n);
// while (n) {
//     n = f.findNext(n);  console.log(n);
// }
