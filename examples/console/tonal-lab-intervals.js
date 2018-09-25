import {Interval} from "tonal";

console.log(Interval.props("1P"));
// { num: 1,
//     q: 'P',
//     step: 0,
//     type: 'P',
//     name: '1P',
//     dir: 1,
//     simple: 1,
//     alt: 0,
//     oct: 0,
//     semitones: 0,
//     chroma: 0 }

console.log(Interval.props("8P"));
// { num: 8,
//     q: 'P',
//     step: 0,
//     type: 'P',
//     name: '8P',
//     dir: 1,
//     simple: 8,
//     alt: 0,
//     oct: 1,
//     semitones: 12,
//     chroma: 0 }

console.log(Interval.props("15P"));
// { num: 15,
//     q: 'P',
//     step: 0,
//     type: 'P',
//     name: '15P',
//     dir: 1,
//     simple: 1,
//     alt: 0,
//     oct: 2,
//     semitones: 24,
//     chroma: 0 }

console.log(Interval.props("2M"));
// { num: 2,
//     q: 'M',
//     step: 1,
//     type: 'M',
//     name: '2M',
//     dir: 1,
//     simple: 2,
//     alt: 0,
//     oct: 0,
//     semitones: 2,
//     chroma: 2 }

console.log(Interval.props("9M"));
// { num: 9,
//     q: 'M',
//     step: 1,
//     type: 'M',
//     name: '9M',
//     dir: 1,
//     simple: 2,
//     alt: 0,
//     oct: 1,
//     semitones: 14,
//     chroma: 2 }

console.log(Interval.props("3m"));
// { num: 3,
//     q: 'm',
//     step: 2,
//     type: 'M',   // "P" or "M" for perfectable or majorable
//     name: '3m',
//     dir: 1,
//     simple: 3,
//     alt: -1,
//     oct: 0,
//     semitones: 3,
//     chroma: 3 }
