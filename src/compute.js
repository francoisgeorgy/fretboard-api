import { Distance, Interval, Note } from "tonal";

/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @returns {number}
 */
export const semitones = (fromString, fromFret, toString, toFret, tuning) => {
    return Distance.semitones(tuning[fromString], tuning[toString]) + toFret - fromFret;
};

/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @returns {*}
 */
export const interval = (fromString, fromFret, toString, toFret, tuning) => {
    return Interval.fromSemitones(semitones(fromString, fromFret, toString, toFret, tuning));
};


/**
 *
 * @param {Object} shape
 * @param {Array} tuning
 * @returns {Array} the intervals as an array[strings][frets]
 */
export const intervals = (frets, root, tuning) => {

    //TODO: use Internal.props() to simplify the code

    let intervals = [];        // one array per string; empty array for non-played strings
    // this.chromas = [];          // one array per string; empty array for non-played strings
    // this.simpleIntervals = [];

    for (let string = 0; string < frets.length; string++) {  // strings

        let iv = [];
        // let chromas = [];

        // console.log(string, frets.length, frets[string].length);

        if (frets[string].length === 0) {
            intervals.push(iv);
            // this.chromas.push(chromas);
            continue;
        }

        for (let fret of frets[string]) {

            // get interval name between this shape's note and the shape's root note:
            let interval_from_root = interval(root.string, root.fret, string, fret, tuning);

            // transform negative interval to positive intervals: (take the inversion)
            if (/*this.onlyPositiveIntervals &&*/ interval_from_root.startsWith('-')) {
                let i = Interval.semitones(interval_from_root);
                while (i < 0) i += 12;
                interval_from_root = Interval.fromSemitones(i);
            }

            let simple = Interval.simplify(interval_from_root);       // Get the simplified version of an interval:

            if (Interval.ic(simple) === 0) simple = '1P';   //TODO: document this simplification

            // intervals.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root);
            // intervalsSimple.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : simple);
            iv.push(interval_from_root);
            // chromas.push(Interval.chroma(interval_from_root));

            // get the simplified name of this interval:
            // if ((si === "1P") || (si === "8P")) si = "R";
            // if (!this.simpleIntervals.includes(simple)) {
            //     this.simpleIntervals.push(simple);          // ! simpleIntervals are not sorted
            // }
        }

        intervals.push(iv);
        // this.chromas.push(chromas);
    }

    // console.log(intervals);

    return intervals;
};

/**
 *
 * @param shape
 * @param tuning
 */
// const intervalsSimple = (intervals) => {
//     let intervals = [];        // one array per string; empty array for non-played strings
//     return intervals;
// };

export const notes = (shape, tuning) => {
    let rootNote = Distance.transpose(tuning[shape.root.string], Interval.fromSemitones(shape.root.fret + shape.position));
    return shape.intervals.map(string => string.map(interval => Distance.transpose(rootNote, interval)));
    // this.simpleNotes = this.simpleIntervals.map(interval => Note.pc(Distance.transpose(rootNote, interval)));
    // return this;
};
