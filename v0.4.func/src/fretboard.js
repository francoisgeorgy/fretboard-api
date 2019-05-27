import produce from "immer";
import { Distance, Interval, Note } from "tonal";
import {Tuning} from './Tuning';
import {Shape} from "./index.js";


/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export const computeTuningIntervals = (tuning = Tuning.guitar.standard) => {
    const tuningIntervals = Array(tuning.length).fill(null);
    for (let i = 0; i < tuning.length; i++) {
        let simple = Interval.simplify(
            Distance.interval(
                tuning[(i - 1 + tuning.length) % tuning.length],
                tuning[i]
            )
        );
        tuningIntervals[i] = simple === '-1P' ? '1P' : simple;
    }
    return Object.freeze(tuningIntervals);
};


/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ 'E', 'A', 'D', 'G', 'B', 'E' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export const computeTuningPitchClasses = (tuning = Tuning.guitar.standard) => {
    return Object.freeze(tuning.map(Note.pc));
};


/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @returns {number}
 */
export const semitones = (fromString, fromFret, toString, toFret, tuning = Tuning.guitar.standard) => {
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
export const interval = (fromString, fromFret, toString, toFret, tuning = Tuning.guitar.standard) => {
    return Interval.fromSemitones(semitones(fromString, fromFret, toString, toFret, tuning));
};


/**
 *
 * @param frets
 * @param root
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export const intervals = (frets, root, tuning = Tuning.guitar.standard) => {

    // console.log(frets, root);

    //TODO: use Internal.props() to simplify the code

    const intervals = [];        // one array per string; empty array for non-played strings
    // this.chromas = [];          // one array per string; empty array for non-played strings
    // this.simpleIntervals = [];

    for (let string = 0; string < frets.length; string++) {  // strings

        let iv = [];
        // let chromas = [];

        // console.log(string, frets.length, frets[string].length, frets[string]);

        if (frets[string].length === 0 || frets[string][0] === 'X') {   //TODO: check that frets[string] is really an array
            intervals.push(iv);
            // this.chromas.push(chromas);
            continue;
        }

        for (let fret of frets[string]) {

            // console.log(root.string, root.fret, string, fret, tuning);  // !!! NaN

            // get interval name between this shape's note and the shape's root note:
            let interval_from_root = interval(root.string, root.fret, string, fret, tuning);

            // console.log("interval_from_root", interval_from_root);  // !!! NaN

            // transform negative interval to positive intervals: (take the inversion)
            // if (/*this.onlyPositiveIntervals &&*/ interval_from_root.startsWith('-')) {
            //     let i = Interval.semitones(interval_from_root);
            //     while (i < 0) i += 12;
            //     interval_from_root = Interval.fromSemitones(i);
            // }

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

    return Object.freeze(intervals);
};


/**
 *
 * @param shape
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export const notes = (shape, tuning = Tuning.guitar.standard) => {
    let rootNote = Distance.transpose(tuning[shape.root.string], Interval.fromSemitones(shape.root.fret));
    return Object.freeze(shape.intervals.map(string => string.map(interval => Distance.transpose(rootNote, interval))));
};


/**
 * Find a position
 *
 * Syntaxe 1: fret(note, string)
 * Syntaxe 2: fret(fromString, fromFret, toString, toFret, minFret, maxFret)
 * @returns {*}
 */
/*
export const fret = (note, string, tuning = Tuning.guitar.standard) => {

    //TODO: re-implement or discard

    if (arguments.length === 2) {
        let note = arguments[0];
        let string = arguments[1];
        return Distance.semitones(this.tuning[string], note);
    }

    if (arguments.length > 2) {
        let fromString = arguments[0];
        let fromFret = arguments[1];
        let toString = arguments[2];
        let minFret = arguments.length > 3 ? arguments[3] : this.minFret;
        let maxFret = arguments.length > 4 ? arguments[4] : this.maxFret;

        let f = this.fret(this.note(fromString, fromFret), toString);

        //TODO: try to simplify the following corrections

        while (f < minFret) f += 12;

        while (
            (f >= minFret) &&
            (
                ((Math.abs(f - fromFret) > 0) && (f >= (minFret + 12))) ||
                (f > maxFret))
            ) f -= 12;

        if ((f < (fromFret - 6)) && (maxFret >= (f+12))) f += 12;

        while (
            (
                (fromFret - f) > 12) ||
            (f < minFret)
            ) f += 12;

        return f;
    }

    throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
}
*/

/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param fret
 * @returns {*}
 */
export const moveToFret = (shape, fret) => {

    // console.log(`fretboard.moveToFret`, shape);

    return produce(shape, draftShape => {

        let delta = fret - Shape.position(draftShape);

        draftShape.root.fret += delta;
        draftShape.position = fret;

        draftShape.frets = draftShape.frets.map(string => string.map(fret => fret === 'X' ? 'X' : (fret + delta)));

        if (draftShape.notes) {
            let iv = Interval.fromSemitones(delta);
            draftShape.notes = draftShape.notes.map(string => string.map(note => Distance.transpose(note, iv)));
        }

        // console.log(`fretboard.moveToFret return`, draftShape);

    });
};


/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param string
 * @returns {*}
 */
/*
export const moveToString = (shape, string) => {
};


export const transposeByString = (shape, string, tuning) => {
    //--> shape
};
*/



/**
 * Play this shape at this position with this tuning
 *
 * @param shape Object
 * @param tuning Array
 * @param position int
 */
export const play = (shape, position = null, tuning = Tuning.guitar.standard) => {

    //TODO: Question: do we embed the tuning? because plying the shape is directly linked to the tuning

    // console.log('fretboard.play');  //, shape, position, tuning);

    // let s = position ? moveToFret(shape, position) : shape

    return produce(position ? moveToFret(shape, position) : shape, draftShape => {

        // console.log(position, draftShape.position, shape.position, ((shape.position === undefined || shape.position === null) ? draftShape.position : shape.position));

        // let positionFrom = (shape.position === undefined || shape.position === null)
        //     ? draftShape.frets[firstPlayedString(draftShape.frets)][0]
        //     : shape.position;

        // let positionFrom = Shape.position(shape);

        draftShape.tuning = tuning;
        // if (position) {
        //     draftShape.position = position;     // fret number
        // } else {
        //     position = positionFrom;
        //     draftShape.position = positionFrom; //draftShape.frets[firstPlayedString(draftShape.frets)][0];
        // }

        //let delta = position - ((shape.position === undefined || shape.position === null) ? draftShape.position : shape.position);
        // let delta = position - positionFrom;

        // console.log(`positionFrom=${positionFrom}, position=${position}, delta=${delta}`);

        // draftShape.root.fret += delta;

        // console.log('play root', draftShape.root);

        draftShape.intervals = intervals(draftShape.frets, draftShape.root, draftShape.tuning);

        draftShape.notes = notes(draftShape, tuning); // pass draftShape because notes() requires intervals()

    });

};

