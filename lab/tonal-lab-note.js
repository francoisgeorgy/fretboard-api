import {Note} from "tonal";

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

console.log(Note.props("C4"));
// { letter: 'C',
//     acc: '',
//     octStr: '4',
//     pc: 'C',
//     name: 'C4',
//     step: 0,
//     alt: 0,
//     oct: 4,
//     chroma: 0,
//     midi: 60,
//     freq: 261.6255653005986 }
