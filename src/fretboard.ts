import produce from "immer";
import {Distance, Interval, note, Note} from "tonal";
import {Tuning} from "./tuning";
import {Intervals, Notes, Shape, ShapeType} from "./shape";

/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
function computeTuningIntervals(tuning = Tuning.guitar.standard): string[]  {
    const tuningIntervals = Array(tuning.length).fill(null);
    for (let i = 0; i < tuning.length; i++) {
        // const d = Distance.interval("C2", "C3");
        const d = Distance.interval(
            tuning[(i - 1 + tuning.length) % tuning.length],
            tuning[i]
        );
        // console.log("computeTuningIntervals d", d);
        if (typeof d !== "string") {    // because Distance.interval can return a function
            throw new Error("unexpected error")
        }
        let simple = Interval.simplify(d);
        tuningIntervals[i] = simple === '-1P' ? '1P' : simple;
    }
    // return Object.freeze(tuningIntervals);
    return tuningIntervals;
}

/**
 * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ 'E', 'A', 'D', 'G', 'B', 'E' ]
 *
 * @param tuning
 * @returns {ReadonlyArray<any>}
 */
function computeTuningPitchClasses(tuning = Tuning.guitar.standard) {
    return Object.freeze(tuning.map(Note.pc));
}

/**
 *
 * @param fromString
 * @param fromFret
 * @param toString
 * @param toFret
 * @param tuning
 */
function semitones(fromString: number, fromFret: number, toString: number, toFret: number, tuning = Tuning.guitar.standard): number {
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
function interval(fromString: number, fromFret: number, toString: number, toFret: number, tuning = Tuning.guitar.standard): string {
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
function intervals(shape: ShapeType, tuning = Tuning.guitar.standard): Intervals {

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

        const stringFrets = shape.frets[string];

        // skip non played strings:
        if (stringFrets == null) {
            shapeIntervals.push(null);
            continue;
        }

        // if (shape.frets[string].length === 0 || shape.frets[string][0] == null) {   //TODO: check that frets[string] is really an array
        //     shapeIntervals.push(stringIntervals);
        //     // this.chromas.push(chromas);
        //     continue;
        // }

        for (let fret of stringFrets) {

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

/* moved into utils.intervalsSimple()
            let simple = Interval.simplify(intervalFromRoot);       // Get the simplified version of an interval:
            if (Interval.ic(simple) === 0) simple = '1P';   //TODO: document this simplification
*/

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

    // return Object.freeze(shapeIntervals);
    return shapeIntervals;
}

/**
 *
 * @param shape
 * @param tuning
 */
function notes(shape: ShapeType, tuning = Tuning.guitar.standard): Notes  {

    if (!shape.root) throw new Error("Shape root must be defined.");
    if (!shape.intervals) throw new Error("Shape intervals must be defined.");

    const rootNote = Distance.transpose(tuning[shape.root.string], Interval.fromSemitones(shape.root.fret));
    if (typeof rootNote !== "string") {    // because Distance.transpose can return a function
        throw new Error("unexpected error")
    }

    // console.log(`notes: rootNote=${rootNote}`);

    // return Object.freeze(
    return shape.intervals.map(
        string => string == null ? null :
            string.map(
            interval => {
                const d = Distance.transpose(rootNote, interval);
                // console.log(`notes: rootNote=${rootNote} interval=${interval} d=${d}`);
                if (typeof d !== "string") {    // because Distance.transpose can return a function
                    throw new Error("unexpected error")     //TODO: need a better error message
                }
                const s = Note.simplify(d);
                if (s == null) {
                    throw new Error("unexpected error")     //TODO: need a better error message
                }
                return s;
            }
        )
    );
    // );
}


/**
 * Find a position
 *
 * Syntaxe 1: fret(note, string)
 * Syntaxe 2: fret(fromString, fromFret, toString, toFret, minFret, maxFret)
 * @returns {*}
 */
/*
const fret = (note, string, tuning = Tuning.guitar.standard) => {

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
function moveToFret(shape: ShapeType, fret: number): ShapeType {

    // console.log(`fretboard.moveToFret`, shape);

    if (shape == null) throw new Error("Invalid argument. Shape can not be null.");

    return produce(shape, draftShape => {

        let delta = fret - Shape.getFretPosition(draftShape);    //FIXME: typescript unhappy
        // let delta = 0;

        if (!draftShape.root) {
            draftShape.root = { //TODO: function to getRoot
                string: 0,
                fret: 0
            };
        }
        draftShape.root.fret += delta;      // FIXME: if we update the root, we must update the frets; otherwise only update the position

        // MOVE THE POSITION
        //FIXME: position should be computed, not an attribute
        // draftShape.position = {string: shape.position.string, fret};
        draftShape.position.fret += delta;

        // MOVE THE FRET POSITIONS:
        draftShape.frets = draftShape.frets.map(
            string => string == null
                ? null
                : string.map(fret => fret + delta)
        );

        if (draftShape.notes) {
            let interval = Interval.fromSemitones(delta);
            draftShape.notes = draftShape.notes.map(
                string => string == null ? null :
                    string.map(
                        note => {
                            const n = Distance.transpose(note, interval);
                            if (typeof n !== "string") {    // because Distance.transpose can return a function
                                throw new Error("unexpected error")
                            }
                            return n;
                        }
                    )
            );
        }
        // console.log(`fretboard.moveToFret return`, draftShape);
    });
}


/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param string
 * @returns {*}
 */
/*
const moveToString = (shape, string) => {
};


const transposeByString = (shape, string, tuning) => {
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
function play(shape: ShapeType, position: number|null = null, tuning = Tuning.guitar.standard): ShapeType {

    //TODO: Question: do we embed the tuning? because playing the shape is directly linked to the tuning

    // console.log('fretboard.play');  //, shape, position, tuning);

    // const s = position ? moveToFret(shape, position) : shape;
    // let s;
    // if (position == null) {
    //     s = shape;
    // } else {
    //     s = moveToFret(shape, position)
    // }

    return produce(position != null ? moveToFret(shape, position) : shape, draftShape => {

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

        draftShape.intervals = intervals(draftShape, draftShape.tuning); //FIXME: typescript unhappy
        draftShape.notes = notes(draftShape, tuning); // pass draftShape because notes() requires intervals()   //FIXME: typescript unhappy

    });

}

export const Fretboard = {
    computeTuningIntervals,
    computeTuningPitchClasses,
    semitones,
    intervals,
    interval,
    notes,
    moveToFret,
    play
};
