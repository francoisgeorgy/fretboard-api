import Tonal from "tonal";
import {normalizeFrets} from "./utils.js";
import {NOT_FRETTED_NUMBER} from "./conf";


/**
 *
 */
export class Shape {

    /**
     *
     * @param shape
     */
    constructor(shape) {

        Object.assign(this, shape);
        this.frets = normalizeFrets(this.frets);

        //TODO: check that frets attribute is specified

        this.computeTuningIntervals();

        if (!this.hasOwnProperty("root")) {
            this.root = {};
            this.root['string'] = this.lowestString();
            this.root['fret'] = this.frets[this.root.string];
        }

        if (!shape.hasOwnProperty('intervals ')) {      // necessary? or can we just override any provided intervals attribute?
            this.computeIntervals();
        }

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
            this.tuningIntervals[i] = Tonal.Distance.interval(this.tuning[i > 0 ? (i-1) : 0], this.tuning[i]);
        }
    }

    /**
     * Returns -1 if no string is fretted
     * @returns {number} Number (1-based) of the lowest-pitched fretted string
     */
    lowestString() {
        let i = this.frets.findIndex(f => f > NOT_FRETTED_NUMBER);
        return i;
    }

    /**
     *
     * @returns {Shape}
     */
    computeIntervals() {

        this.intervals = Array(this.tuning.length).fill(null);       // "string-indexed"
        this.simpleIntervals = [];

        for (let i = 0; i < this.tuning.length; i++) {

            if (this.frets[i] === NOT_FRETTED_NUMBER) {
                continue;
            }

            // get number of semitones from the root string to this string:
            let semitones_from_root = Tonal.Distance.semitones(this.tuning[this.root.string], this.tuning[i]);     // Get the distance between two notes in semitones:

            // get interval name between this shape's note and the shape's root note:
            let interval_from_root = Tonal.Interval.fromSemitones(semitones_from_root + this.frets[i] - this.root.fret);   // Get interval name from semitones number:

            this.intervals[i] = (i === this.root.string) && (interval_from_root === "1P") ? "R" : interval_from_root;

            // get the simplified name of this interval:
            let si = Tonal.Interval.simplify(interval_from_root);       // Get the simplified version of an interval:
            if ((si === "1P") || (si === "8P")) si = "R";
            if (!this.simpleIntervals.includes(si)) {
                this.simpleIntervals.push(si);          // ! simpleIntervals are not sorted
            }
        }

        return this;
    }

    /**
     *
     * @returns {Shape}
     */
    computeNotes() {

        this.notes = Array(this.tuning.length).fill(null);  // "string-indexed"
        this.simpleNotes = [];

        for (let i = 0; i < this.tuning.length; i++) {

            if (this.frets[i] === NOT_FRETTED_NUMBER) {
                continue;
            }

            // get the note name:
            let note = Tonal.Distance.transpose(this.tuning[i], Tonal.Interval.fromSemitones(this.frets[i]));

            this.notes[i] = note;

            // get the note name without the octave:
            let pc = Tonal.Note.pc(note);
            if (!this.simpleNotes.includes(pc)) {
                this.simpleNotes.push(pc);          // ! simpleNotes are not sorted
            }

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
