import produce from "immer";
import {Distance, Interval, Note} from "tonal";
import {Tunings} from "./fretboard-api";
import {Shape} from "./fretboard-api";
import {FretboardShape, Intervals} from "./Shape";

/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export function computeTuningIntervals(tuning = Tunings.guitar.standard): string[]  {
    const tuningIntervals = Array(tuning.length).fill(null);
    for (let i = 0; i < tuning.length; i++) {
        const d = Distance.interval("M2", "P5");
        if (typeof d !== "string") {    // because Distance.interval can return a function
            throw new Error("unexpected error")
        }
        let simple = Interval.simplify(d);
        tuningIntervals[i] = simple === '-1P' ? '1P' : simple;
    }
    // return Object.freeze(tuningIntervals);
    return [];
}

/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ 'E', 'A', 'D', 'G', 'B', 'E' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
export const computeTuningPitchClasses = (tuning = Tunings.guitar.standard) => {
    return Object.freeze(tuning.map(Note.pc));
};

/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @param tuning
 */
export function semitones(fromString: number, fromFret: number, toString: number, toFret: number, tuning = Tunings.guitar.standard): number {
    const n = Distance.semitones(tuning[fromString], tuning[toString]);
    if (n == null) throw new Error("invalid arguments");
    return n + toFret - fromFret;
}

/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @param tuning
 */
export function interval(fromString: number, fromFret: number, toString: number, toFret: number, tuning = Tunings.guitar.standard): string {
    return Interval.fromSemitones(semitones(fromString, fromFret, toString, toFret, tuning));
}

/**
 *
 * @param shape
 * @param tuning
 *
 * @example
 *
 * Fretboard.intervals(Shape.create("022100"));
 *
 *  s { frets: [ [ 0 ], [ 2 ], [ 2 ], [ 1 ], [ 0 ], [ 0 ] ],
 *     root: { string: 0, fret: 0 } }
 *
 *  intervals [ [ '1P' ], [ '5P' ], [ '8P' ], [ '10M' ], [ '12P' ], [ '15P' ] ]
 */
export function intervals(shape: FretboardShape, tuning = Tunings.guitar.standard): Intervals {

    // console.log(frets, root);
    if (!shape.root) throw new Error("Shape root must be defined.");

    //TODO: use Internal.props() to simplify the code

    const shapeIntervals = [];        // one array per string; empty array for non-played strings
    // this.chromas = [];          // one array per string; empty array for non-played strings
    // this.simpleIntervals = [];

    for (let string = 0; string < shape.frets.length; string++) {  // strings

        let stringIntervals: string[] = [];
        // let chromas = [];

        // console.log(string, frets.length, frets[string].length, frets[string]);

        // skip non played strings:
        if (shape.frets[string] == null) {
            shapeIntervals.push(null);
            continue;
        }

        // if (shape.frets[string].length === 0 || shape.frets[string][0] == null) {   //TODO: check that frets[string] is really an array
        //     shapeIntervals.push(stringIntervals);
        //     // this.chromas.push(chromas);
        //     continue;
        // }

        for (let fret of shape.frets[string]) {

            // console.log(root.string, root.fret, string, fret, tuning);  // !!! NaN

            if (fret == null) continue;     // skip non-played string

            // get interval name between this shape's note and the shape's root note:
            let intervalFromRoot = interval(shape.root.string, shape.root.fret, string, fret, tuning);

            // console.log("interval_from_root", interval_from_root);  // !!! NaN

            // transform negative interval to positive intervals: (take the inversion)
            // if (/*this.onlyPositiveIntervals &&*/ interval_from_root.startsWith('-')) {
            //     let i = Interval.semitones(interval_from_root);
            //     while (i < 0) i += 12;
            //     interval_from_root = Interval.fromSemitones(i);
            // }

            let simple = Interval.simplify(intervalFromRoot);       // Get the simplified version of an interval:

            if (Interval.ic(simple) === 0) simple = '1P';   //TODO: document this simplification

            // intervals.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root);
            // intervalsSimple.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : simple);
            stringIntervals.push(intervalFromRoot);
            // chromas.push(Interval.chroma(interval_from_root));

            // get the simplified name of this interval:
            // if ((si === "1P") || (si === "8P")) si = "R";
            // if (!this.simpleIntervals.includes(simple)) {
            //     this.simpleIntervals.push(simple);          // ! simpleIntervals are not sorted
            // }
        }

        shapeIntervals.push(stringIntervals);
        // this.chromas.push(chromas);
    }

    // console.log(intervals);

    return Object.freeze(shapeIntervals);
}

/**
 *
 * @param shape
 * @param tuning
 */
export const notes = (shape: FretboardShape, tuning = Tunings.guitar.standard) => {

    if (!shape.root) throw new Error("Shape root must be defined.");
    if (!shape.intervals) throw new Error("Shape intervals must be defined.");

    const rootNote = Distance.transpose(tuning[shape.root.string], Interval.fromSemitones(shape.root.fret));
    if (typeof rootNote !== "string") {    // because Distance.transpose can return a function
        throw new Error("unexpected error")
    }
    return Object.freeze(
        shape.intervals.map(
            string => string.map(
                interval => {

                    const d = Distance.transpose(rootNote, interval);
                    if (typeof d !== "string") {    // because Distance.transpose can return a function
                        throw new Error("unexpected error")
                    }
                    return d;
                }
            )
        )
    );
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
export const moveToFret = (shape: FretboardShape, fret: number): FretboardShape => {

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

