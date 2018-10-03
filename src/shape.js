import Assert from "assert-js";
import produce from "immer";
import {firstPlayedString, normalizeInputFormat} from "./utils";
// import {intervals, notes} from "./compute";

/**
 *
 * @param shape
 * @returns {{frets, fingers, root, position, intervals, notes, intervalsSimple, notesSimple}}
 */
export const create = (shape) => {

    console.log('shape.create'/*, shape*/);

    // TODO: make root absolute to avoid confusion with the position and the frets. The root could even be specified in a position that is outside the shape.

    let o = {
        frets: null,           // user specified
        fingers: null,         // user specified
        root: null,            // user specified or auto-computed; root is absolute (relative to the fretboard)
        position: null,        // user specified or auto-computed; position is absolute (relative to the fretboard); position is only the fret number. position is always for the first played string.
        tuning: null,          // added when played
        intervals: null,       // computed when played
        notes: null,           // computed when played
        intervalsSimple: null, // computed when played
        notesSimple: null      // computed when played
    };

    if ((typeof shape === 'string') || Array.isArray(shape)) {

        o.frets = normalizeInputFormat(shape);

    } else if (typeof shape === 'object') {

        Assert.hasProperty('frets', shape);

        ['frets', 'fingers'].map(p => o[p] = normalizeInputFormat(shape[p]));

        ['position', 'root'].map(p => o[p] = shape[p]);

    } else {
        throw new Error("InvalidArgumentException");    // TODO: return a more helpful message
    }

    // this.onlyPositiveIntervals = true;  //TODO

    // FRETBOARD:

    // if (fretboard === null) {
    //     // we create or own fretboard instance if we don't receive one
    //     this.fretboard = new Fretboard();   //TODO: tuning parameter
    // } else {
    //     this.fretboard = fretboard;
    // }

    // FRETS:

    // o.frets = normalizeInputFormat(o.frets);

    // if (o.fingers) o.fingers = normalizeInputFormat(o.fingers);

    // if (normalizePosition) o.frets = normalizeFretsPosition(o.frets);

    // number of played string not greater than number of strings in tuning?:
    // Assert.true(o.frets.length <= o.fretboard.tuning.length);

    // add missing strings if needed:
    // while (o.frets.length < o.fretboard.tuning.length) {
    //     o.frets.push([]);
    // }

    // o.computePosition();
    //
    // // POSITION:
    //
    // if (!o.position) {
    //     let f = firstPlayedString(o.frets);
    //     o.position = {
    //         string: f,
    //         fret: o.frets[f][0]
    //     };
    // }

    // ROOT:

    if (!o.root) {
        // by default takes the first fretted note on the first played string
        let f = firstPlayedString(o.frets);
        o.root = {
            string: f,
            fret: o.frets[f][0]
        };
/*
        o.root = {
            string: o.position.string,
            fret: o.position.fret
        };
*/
    }


    // INTERVALS:

    // o.computeIntervals();

    // o.intervals = intervals(o, []);

    // NOTES:

    // o.computeNotes();

    // console.log('shape.create', o);

    return o;
};

/**
 * Shape on fretboard
 *
 * @param shape Object
 * @param tuning Array
 * @param position int
 */
/*
export const play = (shape, tuning, position = null) => {

    //TODO: Question: do we embed the tuning? because plying the shape is directly linked to the tuning

    console.log('play', position);

    return produce(shape, draftShape => {

        // console.log(position, draftShape.position, shape.position, ((shape.position === undefined || shape.position === null) ? draftShape.position : shape.position));

        let positionFrom = (shape.position === undefined || shape.position === null)
            ? draftShape.frets[firstPlayedString(draftShape.frets)][0]
            : shape.position;

        draftShape.tuning = tuning;
        if (position) {
            draftShape.position = position;     // fret number
        } else {
            draftShape.position = positionFrom; //draftShape.frets[firstPlayedString(draftShape.frets)][0];
        }

        //let delta = position - ((shape.position === undefined || shape.position === null) ? draftShape.position : shape.position);
        let delta = position - positionFrom;

        console.log(delta, position, draftShape.position, shape.position, ((shape.position === undefined || shape.position === null) ? draftShape.position : shape.position));

        draftShape.root.fret += delta;

        console.log('play root', draftShape.root);

        draftShape.intervals = intervals(draftShape.frets, draftShape.root, draftShape.tuning);
        draftShape.notes = notes(draftShape, tuning); // pass draftShape because notes() requires intervals()
    });
};
*/

/**
 *
 * @param shape
 * @returns {boolean | string[] | *}
 */
export const isPlayed = (shape) => {
    return shape.hasOwnProperty('tuning') && Array.isArray(shape.tuning) && shape.tuning.length > 0;
};


/**
 *
 * @param shape
 * @returns {*}
 */
export const position = (shape) => {
    return (shape.position === undefined || shape.position === null)
        ? shape.frets[firstPlayedString(shape.frets)][0]
        : shape.position;
};


/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param string
 * @param fret
 */
export const moveTo = (shape, string, fret) => {
    //--> shape

/*
    Assert.greaterThanOrEqual(0, string);
    Assert.greaterThanOrEqual(0, fret);

    let changed = false;

    if (fret !== this.position.fret) {

        let delta = fret - this.position.fret;

        if (delta !== 0) {
            this.root.fret += delta;
            for (let s = 0; s < this.frets.length; s++) {  // strings
                for (let f = 0; f < this.frets[s].length; f++) {  // frets
                    this.frets[s][f] += delta;
                }
            }
            changed = true;
        }
    }

    if (string !== this.position.string) {

        //TODO: move across strings

        changed = true;
    }

    if (changed) this.update();

    return this;
*/
};


/**
 * shape is not changed; intervals may change depending on the tuning.
 * @param shape
 * @param string
 * @returns {*}
 */
export const moveToString = (shape, string) => {
};


export const transposeByString = (shape, string, tuning) => {
    //--> shape
};

