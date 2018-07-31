// import Tonal from "tonal";
import { Distance, interval, Interval, Note } from "tonal";
import {normalizeFrets} from "./utils.js";
import {DEF_TUNING, NOT_FRETTED_NUMBER} from "./conf";
import {normalizeFretsFormat, normalizeFretsPosition} from "./utils";
import Assert from "assert-js";
import enharmonics from "enharmonics";


/**
 * Build a shape from a partial or complete definition.
 *
 * The final shape will have, at least, the following properties:
 *
 * - frets : array of one element per string
 * - intervals
 * - simpleIntervals
 * - stackedIntervals (from low to high notes)
 * - reverseStackedIntervals (from high to low notes)
 * - notes
 * - simpleNotes
 * - root.string
 * - root.fret
 * - firstFret : the lowest fret number (>= 0)
 * - firstString : the lowest fret number (> 0)
 *
 * It can also have, if specified during the creation:
 *
 * - fingers
 *
 * It will also have the following properties that are used internally but may be useful:
 *
 * - tuning
 * - tuningIntervals (from low string to high string)
 *
 */
export class Shape {

    /**
     *
     * @param shape
     */
    constructor(shape, normalizePosition = false) {

        Assert.hasProperty('frets', shape);

        Object.assign(this, shape);

        // TUNING:

        if (!this.hasOwnProperty('tuning')) {
            this.tuning = DEF_TUNING;
        }

        this.computeTuningIntervals();

        // FRETS:

        this.frets = normalizeFretsFormat(this.frets);

        if (normalizePosition) this.frets = normalizeFretsPosition(this.frets);

        // TODO: compute lowestFret and lowestString

        // ROOT:

        // TODO: normalize root if given as a string
        if (!this.hasOwnProperty("root")) {
            this.root = {};
            this.root['string'] = this.lowestString();
            this.root['fret'] = this.frets[this.root.string][0];    // by default takes the first fretted note on the first played string
        }

        // INTERVALS:

        if (!shape.hasOwnProperty('intervals ')) {      // necessary? or can we just override any provided intervals attribute?
            this.computeIntervals();
        }

        // NOTES:

        if (!shape.hasOwnProperty('notes')) {           // necessary? or can we just override any provided notes attribute?
            this.computeNotes();
        }

    }

    /**
     *
     */
    update() {
        this.computeIntervals();
        this.computeNotes();
    }

    /**
     * Reset frets.
     */
    reset() {
        // TODO
        return this;
    }

    /**
     *
     * @returns {*}
     */
    getTuning() {
        return this.tuning;
    }

    /**
     *
     * @param tuning
     */
    setTuning(tuning) {
        this.tuning = tuning;
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
     */
    computeTuningIntervals() {
        this.tuningIntervals = Array(this.tuning.length).fill(null);
        for(let i = 0; i < this.tuning.length; i++) {
            this.tuningIntervals[i] = interval(this.tuning[i > 0 ? (i-1) : 0], this.tuning[i]);
        }
    }

    /**
     * Returns -1 if no string is fretted
     * @returns {number} Number (1-based) of the lowest-pitched fretted string
     */
    lowestString() {
        let i = this.frets.findIndex(f => f.length > 0);
        return i;
    }

    /**
     *
     * @returns {Shape}
     */
    computeIntervals() {

        this.intervals = [];
        this.simpleIntervals = [];

        for (let i = 0; i < this.frets.length; i++) {  // strings

            let intv = [];

            if (this.frets[i].length === 0) {
                this.simpleIntervals.push(intv);
                continue;
            }

            // get number of semitones from the root string to this string:
            let semitones_from_root = Distance.semitones(this.tuning[this.root.string], this.tuning[i]);     // Get the distance between two notes in semitones:

            // console.log(`string semitones_from_root=${semitones_from_root}`);

            for (let f = 0; f < this.frets[i].length; f++) {  // frets

                // console.log(`string ${i} fret ${f}`);

                // get interval name between this shape's note and the shape's root note:
                let interval_from_root = Interval.fromSemitones(semitones_from_root + this.frets[i][f] - this.root.fret);   // Get interval name from semitones number:

                // console.log(`string ${i} fret ${f} : interval_from_root=${interval_from_root}`);

                intv.push((i === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root);

                // this.intervals[i] = (i === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root;

                // get the simplified name of this interval:
                let si = Interval.simplify(interval_from_root);       // Get the simplified version of an interval:
                if ((si === "1P") || (si === "8P")) si = "R";
                if (!this.simpleIntervals.includes(si)) {
                    this.simpleIntervals.push(si);          // ! simpleIntervals are not sorted
                }
            }

            this.intervals.push(intv);
        }

        return this;
    }

    /**
     *
     * @returns {Shape}
     */
    computeNotes() {

        this.notes = [];
        this.simpleNotes = [];

        let rootNote = Distance.transpose(this.tuning[this.root.string], Interval.fromSemitones(this.root.fret));
        let rootTokens = Note.tokenize(rootNote);
        // let rootAccidental = rootTokens[1];
        let previousAccidental = rootTokens[1];

        for (let i = 0; i < this.frets.length; i++) {  // strings

            let notes = [];

            if (this.frets[i].length === 0) {
                this.notes.push(notes);
                continue;
            }

            for (let f = 0; f < this.frets[i].length; f++) {  // frets

                // get the note name:
                let note = Distance.transpose(this.tuning[i], Interval.fromSemitones(this.frets[i][f]));

                //
                // We try to have the same kind of accidental across all notes.
                //
                // Example with Shape({frets: "5 7, 4 5 7, 4 6 7, 4 6 7, 5 7, 4 5"})
                //
                // without correction: A2 B2 C#3 D3 E3 F#3 Ab3 A3 B3 Db4 D4 E4 F#4 G#4
                // with correction:    A2 B2 C#3 D3 E3 F#3 G#3 A3 B3 C#4 D4 E4 F#4 G#4
                //                                         ^^^       ^^^
                // with the correction, Ab3 is changed to G#3 and Dd4 to C#4.
                //
                // Same with "7 9, 6 7 9, 6 8 9, 6 8 9, 7 9, 6 7"
                //
                // before correction: B2 C#3 Eb3 E3 F#3 Ab3 Bb3 B3 Db4 Eb4 E4 F#4 G#4 Bb4 B4
                // after correction:  B2 C#3 D#3 E3 F#3 G#3 A#3 B3 C#4 D#4 E4 F#4 G#4 Bb4 B4
                //                           ^^^        ^^^ ^^^    ^^^ ^^^

                let t = Note.tokenize(note);
                // if (t[1] !== rootAccidental) {
                if (t[1] !== previousAccidental) {
                    for (let h of enharmonics(note)) {
                        let k = Note.tokenize(h);
                        // if (k[1] === t[1]) {
                        //     note = h;
                        //     break;
                        // }
                        if (k[1] === previousAccidental) {
                            note = h;
                            break;
                        }
                    }
                }

                t = Note.tokenize(note);
                if (t[1] !== '') previousAccidental = t[1];

                notes.push(note);

                // get the note name without the octave:
                let pc = Note.pc(note);
                if (!this.simpleNotes.includes(pc)) {
                    this.simpleNotes.push(pc);          // ! simpleNotes are not sorted
                }

            }

            this.notes.push(notes);
        }

        return this;
    }

    /*
        transpose(semitones) {
            //return Array.from(shape.frets.toUpperCase()).map(f => f === 'X' ? 'X' : parseInt(f, 10) + semitones);
            return this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + semitones);
        }

        key(root) {
            return this.transpose(fret(this.lowestString(), root, this.tuning));
        }
    */

    /**
     *
     * @param fret
     * @param string
     * @returns {Shape}
     */
    moveTo({fret=-1, string=-1} = {}) {
        let changed = false;
        if (fret >= 0) {
            let delta = fret - this.frets[this.lowestString()];
            this.frets = this.frets.map(f => f === NOT_FRETTED_NUMBER ? NOT_FRETTED_NUMBER : f + delta);
            this.root.fret = this.root.fret + delta;
            changed = true;

        }

        if (string >= 0) {

            //TODO: move across strings

            changed = true;
        }

        if (changed) this.update();

        return this;
    }

} // Shape
