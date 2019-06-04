
import {Note} from "tonal";

// let note = 'Cb3';
// let n = Note.enharmonic(note);
//console.log(note, Note.tokenize(note), Note.enharmonic(note), Note.enharmonic.simplify(note));
// console.log(note, Note.tokenize(note), Note.enharmonic(note));
// console.log(n, d, n[d]);

let note = 'Cb3';
console.log(note, Note.tokenize(note), Note.enharmonic(note));

note = 'Db3';
console.log(note, Note.tokenize(note), Note.enharmonic(note));
