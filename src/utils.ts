/**
 * Returns -1 if no string is played
 * @returns {number} Number (1-based) of the lowest-pitched fretted string
 */
import {N} from "./types";

// import {isNullOrUndefined} from "util";


export function firstPlayedString(frets: N[][]): number {
    // return frets.findIndex(f => f.length > 0 && f[0] !== 'X');
    return 0;
}

/**
 * Returns first played fret (non null)
 * @param frets
 */
export function firstPlayedFret(frets: N[]): number {
    // return frets.findIndex(f => f.length > 0 && f[0] !== 'X');
    return 0;
}

// type N = number|null;

/**
 * In string definition, use 'X' to denote a non-played string.
 * In number[] definition, use 'null' to denote a non-played string.
 * "022100" --> [[0], [2], [2], [1], [0], [0]]
 * "8 10 10 9 8 8" --> [[8], [10], [10], [9], [8], [8]]
 * [8, 10, 10, 9, 8, 8] --> [[8], [10], [10], [9], [8], [8]]
 * "24,124,134,134,24,12" --> [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2]]
 * "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8" --> [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8]]
 * @param {?(array|string)} frets - frets.
 * @return {array} array of fret numbers.
 */
export function normalizeInputFormat(frets: number[]): N[][]|undefined;
export function normalizeInputFormat(frets: string): N[][]|undefined;
export function normalizeInputFormat(frets: any): N[][]|undefined {

    // if (typeof frets !== 'string') return frets;

    // if ((frets === undefined) || (frets === null)) {    //FIXME: simplify this test
    if (!frets) {
        return undefined;
    }

    if (Array.isArray(frets)) {
        if (Array.isArray(frets[0])) {
            return frets;
        }
        return frets.map(s => {
            if (typeof s === 'string') {
                // return s.toUpperCase() === 'X' ? ['X'] : [parseInt(s, 10)];
                return s.toUpperCase() === 'X' ? [null] : [parseInt(s, 10)];    // value "null" means non-played string
            } else {
                return [s];
            }
        });
    }

    let fs = frets.toUpperCase().replace(/\s+/g, ' ');  // replace multiples blanks with one space

    if (fs.indexOf(',') < 0) {
        // only one fretted note per string
        let a = fs.indexOf(' ') >= 0
            ? fs.split(' ')     // "8 10 ..." --> ["8", "10", ...]
            : Array.from(fs);   // "022100" --> ["0", "2", "2", "1", "0", "0"]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [null];     // value "null" means non-played string
            if (s === '-') return [];
            return [parseInt(s, 10)]
        });
        // return a.map(s => s.toUpperCase() === 'X'
        //         ? []
        //         : Array.from(s).map(e => parseInt(e, 10)));
        //         // : s.split(' ').
        //         //     map(e => parseInt(e, 10)));
    } else {
        let a: string[] = fs.replace(/,\s*/g, ',').split(',');    // "8 10, 7 8 10, ..." --> ["8 10", "7 8 10", ...]
        return a.map((s: string) => {
            if (s.toUpperCase() === 'X') return [null];
            if (s === '' || s === '-') return [];
            return (s.indexOf(' ') >= 0
                    ? s.split(' ')              // ["8 10", ...] --> [["8", "10"], ...]
                    : Array.from(s)             // ["24", "124", ...] --> [["2", "4"], ["1", "2", "4"], ...]
            ).map(s => {
                if (s.toUpperCase() === 'X') throw new Error('invalid format');
                if (s === '-') throw new Error('invalid format');
                return parseInt(s, 10)
            });
        });
    }

}
