import { Interval } from "tonal";

// Interval.props(3m) :
// { num: 3,
//     q: 'm',
//     step: 2,
//     type: 'M',
//     name: '3m',
//     dir: 1,
//     simple: 3,
//     alt: -1,
//     oct: 0,
//     semitones: 3,
//     chroma: 3 }

// Interval.props(12m) :
// { num: 12,
//     q: 'm',
//     step: 4,
//     type: 'P',
//     name: '12m',
//     dir: 1,
//     simple: 5,
//     alt: null,
//     oct: 1,
//     semitones: 19,
//     chroma: 7 }

// Interval.props(15P) :
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

// Interval.props(5d) :
// { num: 5,
//     q: 'd',
//     step: 4,
//     type: 'P',
//     name: '5d',
//     dir: 1,
//     simple: 5,
//     alt: -1,
//     oct: 0,
//     semitones: 6,
//     chroma: 6 }

// Interval.props(5A) :
// { num: 5,
//     q: 'A',
//     step: 4,
//     type: 'P',
//     name: '5A',
//     dir: 1,
//     simple: 5,
//     alt: 1,
//     oct: 0,
//     semitones: 8,
//     chroma: 8 }

/*
export function intervalSimple(str) {
    let i = Interval.props(str);
    if (i.chroma === 0) return 'R';
    let n = (i.num % 7) === 0 ? 7 : (i.num % 7);
    if ((i.q === 'M') || (i.q === 'P')) return '' + n;
    return i.q + n;
}
*/
export function intervalText(interval, compound=false) {

    let props = Interval.props(interval);

    if (props.chroma === 0) return compound ? props.num.toString() : 'R';     // make optional

    let t = compound ? props.num.toString() : props.simple.toString();

    if ((props.q === 'M') || (props.q === 'P')) return t;

    return t + props.q;
}
