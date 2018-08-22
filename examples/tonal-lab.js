import {Distance, Note, Interval} from "tonal";
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


let i1 = '15P';
let i2 = '-4P';
console.log(Interval.semitones(i2) - Interval.semitones(i1), Interval.semitones(i1) - Interval.semitones(i2));

console.log('15P', Interval.simplify('15P'));  // 1P

console.log('-5d', Interval.ic('-5d'));
console.log('5d', Interval.ic('5d'));
console.log('-4P', Interval.ic('-4P'));
console.log('4P', Interval.ic('4P'));

console.log('invert -5d', Interval.invert('-5d'));
console.log('invert  5d', Interval.invert('5d'));
console.log('invert -4P', Interval.invert('-4P'));
console.log('invert  4P', Interval.invert('4P'));

console.log('props -5d', Interval.props('-5d'));
console.log('props  5d', Interval.props('5d'));
console.log('props -4P', Interval.props('-4P'));
console.log('props  4P', Interval.props('4P'));

console.log(Distance.add("-5d", "8P"));
console.log(Distance.add("-5d", "15P"));

d = Interval.semitones('7M') - Interval.semitones('-5d');
console.log(d, Interval.fromSemitones(d));

d = Interval.semitones('-5d') - Interval.semitones('7M') + 24;
console.log(d, Interval.fromSemitones(d));

d = Interval.semitones('-4P');
console.log(d, d + 24, Interval.fromSemitones(d + 24));

d = Interval.semitones('-2m');
console.log(d, d + 12, Interval.fromSemitones(d + 12)); // 7M

for (const i of ['1P', '3M', '12m', '15P']) {
    console.log(`Interval.props(${i}) :`);
    console.log(Interval.props(i));
    console.log(`ic: ${Interval.ic(i)}`);
}

//   C   D   E   F   G   A   B     C   D   E   F   G   A   B     C
//   1   2   3   4   5   6   7     8   9  10  11  12  13  14    15
//   1   2   3   4   5   6   7     1   2   3   4   5   6   7     1
//                                               12m

for (let s=0; s<16; s++) {
    let i = Interval.fromSemitones(s);
    // console.log(`Interval.props(${i}) :`);
    // console.log(Interval.props(i));
    console.log(`${s} chroma: ${Interval.chroma(i)}, ic: ${Interval.ic(i)}`);
}
