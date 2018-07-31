import {Note} from "tonal";
import enharmonics from "enharmonics";

let note = 'F#2';
console.log(note, Note.tokenize(note), enharmonics(note), enharmonics.simplify(note));

let t = Note.tokenize(note);
let d = 0;
switch (t[1]) {
    case '#': d = 0; break;
    case '':  d = 1; break;
    case 'b': d = 2; break;
}

note = 'Eb3';
let eb3 = enharmonics(note);
console.log(note, Note.tokenize(note), enharmonics(note), enharmonics.simplify(note));
console.log(eb3, d, eb3[d]);
