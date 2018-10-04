import Assert from "assert-js";
import {firstPlayedString, normalizeInputFormat} from "./utils";
import produce from "immer";

/**
 *
 * @param shape
 * @returns {{frets, fingers, root, position, intervals, notes, intervalsSimple, notesSimple}}
 */
export const create = (shape) => {

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

    if (!o.root) {
        // by default takes the first fretted note on the first played string
        let f = firstPlayedString(o.frets);
        o.root = {
            string: f,
            fret: o.frets[f][0]
        };
    }

    return o;
};


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


export const add = (shape, string, fret) => {

    return produce(shape, draftShape => {

        while ((draftShape.frets.length - 1) < string) {
            draftShape.frets.push([]);
        }

        if (Array.isArray(draftShape.frets[string])) {
            if (draftShape.frets[string][0] === 'X') {
                draftShape.frets[string][0] = fret;
            } else {
                draftShape.frets[string].push(fret);
            }
        } else {
            draftShape.frets[string] = [fret];
        }

    });

};


/**
 * Works like "replace or add"
 * @param shape
 * @param string
 * @param fret
 * @returns {*}
 */
export const replace = (shape, string, fret) => {

    return produce(shape, draftShape => {

        while ((draftShape.frets.length - 1) < string) {
            draftShape.frets.push([]);
        }

        if (fret === undefined || fret === null) {
            draftShape.frets[string] = [];
        } else if (typeof fret === 'string') {
            if (fret === '-' || fret === '') {
                draftShape.frets[string] = [];
            } else if (fret.toUpperCase() === 'X') {
                draftShape.frets[string] = ['X'];
            } else {
                throw new Error("invalid fret " + fret);
            }
        } else {
            draftShape.frets[string] = [fret];
        }

    });

};


export const remove = (shape, string, fret) => {

    return replace(shape, string, null);

};


export const compact = (shape) => {

    return produce(shape, draftShape => {

        while (draftShape.frets[draftShape.frets.length - 1].length === 0) {
            draftShape.frets.pop();
        }

    });

};

