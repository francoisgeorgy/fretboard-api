import {Distance, Note, Interval, Scale} from "tonal";

console.log(Scale.names());

// console.log(Scale.notes("Ab bebop"));


console.log(Scale.intervals("major"));

console.log(Scale.notes("C major"));

console.log(Note.props("C#3"));
// { letter: 'C',
//     acc: '#',
//     octStr: '3',
//     pc: 'C#',
//     name: 'C#3',
//     step: 0,
//     alt: 1,
//     oct: 3,
//     chroma: 1,
//     midi: 49,
//     freq: 138.59131548843604 }

console.log(Note.props("C"));
// { letter: 'C',
//     acc: '',
//     octStr: '',
//     pc: 'C',
//     name: 'C',
//     step: 0,
//     alt: 0,
//     oct: null,
//     chroma: 0,
//     midi: null,
//     freq: null }

console.log(Note.tokenize("C"));        // [ 'C', '', '', '' ]
console.log(Note.tokenize("C#3"));      // [ 'C', '#', '3', '' ]

