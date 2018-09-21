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

let note = Note.from({oct: 3}, "A");

console.log(note, Note.name(note));

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




//
// let n = f.find('E');    console.log(n);
// while (n) {
//     n = f.findNext(n);  console.log(n);
// }
