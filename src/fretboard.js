import produce from "immer";
import { Distance, Interval, Note } from "tonal";
// import {firstPlayedString} from "./utils";
// import {intervals, notes} from "./compute";
import {Tuning} from './Tuning';
import {Shape} from "./index.js";



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
 * @param frets
 * @param root
 * @param tuning
 * @returns {Array}
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


export const notes = (shape, tuning) => {
    let rootNote = Distance.transpose(tuning[shape.root.string], Interval.fromSemitones(shape.root.fret));
    return shape.intervals.map(string => string.map(interval => Distance.transpose(rootNote, interval)));
};


/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param fret
 * @returns {*}
 */
export const moveToFret = (shape, fret) => {

    console.log(`fretboard.moveToFret`);

    return produce(shape, draftShape => {

        let delta = fret - Shape.position(draftShape);

        draftShape.root.fret += delta;
        draftShape.position = fret;

        draftShape.frets = draftShape.frets.map(string => string.map(fret => fret + delta));

        if (draftShape.notes) {
            let iv = Interval.fromSemitones(delta);
            draftShape.notes = draftShape.notes.map(string => string.map(note => Distance.transpose(note, iv)));
        }

    });
};

/**
 * Play this shape at this position with this tuning
 *
 * @param shape Object
 * @param tuning Array
 * @param position int
 */
export const play = (shape, position = null, tuning = Tuning.guitar.standard) => {

    //TODO: Question: do we embed the tuning? because plying the shape is directly linked to the tuning

    console.log('fretboard.play');  //, shape, position, tuning);

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

