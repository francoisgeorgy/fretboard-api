import {mandatory} from "./utils";
import {Shape} from "./Shape";
import {Distance, Interval, Note, Scale} from "tonal";
import {Tuning} from "./Tuning";
import stringify from "json-stringify-pretty-compact";
import Assert from "assert-js";

/**
 *
 */
export class Fretboard {

    /**
     *
     * @param tuning
     * @param frets
     */
    constructor({tuning = Tuning.guitar.standard, frets = 24} = {}) {
        this.tuning = tuning;
        // this.tuningPitchClasses = tuning;
        this.numberOfStrings = this.tuning.length;
        this.minFret = 0;
        this.maxFret = frets;
        this.shapes = [];
        this.nextID = 0;
        this.computeTuningIntervals();
        this.computeTuningPitchClasses();
    }

    /**
     * TODO: make private
     * @returns {number}
     */
    uniqueId() {
        return this.nextID++;
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
/*
        this.shapes.forEach(function(s) {
            //TODO: only change shape's tuning if the shape was created WITH a tuning.
            s.setTuning(tuning);
        });
*/
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ '1P', '4P', '4P', '4P', '3M', '4P' ]
     */
    computeTuningIntervals() {
        // this.tuningIntervals = Array(this.tuning.length).fill(null);
        this.tuningIntervals = Array(this.tuning.length).fill(null);
        for (let i = 0; i < this.tuning.length; i++) {
            //this.tuningIntervals[i - 1] = interval(this.tuning[i > 0 ? (i - 1) : 0], this.tuning[i]);
            // this.tuningIntervals[i] = Distance.interval(this.tuning[i - 1], this.tuning[i]);
            let simple = Interval.simplify(
                Distance.interval(
                    this.tuning[(i -1 + this.tuning.length) % this.tuning.length],
                    this.tuning[i]
                )
            );
            this.tuningIntervals[i] = simple === '-1P' ? '1P' : simple;
            // this.tuningIntervals[i] = Interval.simplify(
            //     Distance.interval(
            //         this.tuning[(i -1 + this.numberOfStrings) % this.numberOfStrings],
            //         this.tuning[i]
            //     )
            // );
        }
    }

    /**
     * [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ] --> [ 'E', 'A', 'D', 'G', 'B', 'E' ]
     */
    computeTuningPitchClasses() {
        this.tuningPitchClasses = this.tuning.map(Note.pc);
    }

    /**
     *
     * @param shape
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addShape({shape=mandatory(), fret, string} = {}) {
        let s = new Shape(Object.assign(shape, {tuning: this.tuning, id: this.uniqueId()}));
        s.moveTo({fret, string});
        this.shapes.push(s);
        return s;
    }

    /**
     * Alias to addShape()
     * @param pattern
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addPattern({pattern=mandatory(), fret, string} = {}) {
        return this.addShape({shape: pattern, fret, string})
    }

    /**
     *
     * @param chordShape
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addChord({chordShape=mandatory(), fret, string} = {}) {

        //TODO: verify that we have at most one note per string

        return this.addShape({shape: chordShape, fret, string})
    }

    /**
     *
     * @param scaleShape
     * @param fret
     * @param string
     * @returns {Shape}
     */
    addScale({scaleShape=mandatory(), fret, string} = {}) {

        //TODO: allow more than one note per string

        return this.addShape({shape: scaleShape, fret, string})
    }

    /**
     *
     * @param idOrShape
     * @returns {Fretboard}
     */
    removeShape(idOrShape) {
        let id = typeof idOrShape === 'number' ? idOrShape : idOrShape.id;
        let i = this.shapes.findIndex(e => e.id === id);
        if (i > -1) {
            this.shapes.splice(i, 1);
        }
        return this;
    }

    /**
     *
     * @param string 0-indexed string number
     * @param fret
     * @returns {*}
     */
    note(string, fret) {
        return Distance.transpose(this.tuning[string], Interval.fromSemitones(fret));
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @param toFret
     * @returns {number}
     */
    semitones(fromString, fromFret, toString, toFret) {
        return Distance.semitones(this.tuning[fromString], this.tuning[toString]) + toFret - fromFret;
    }

    interval(fromString, fromFret, toString, toFret) {
        return Interval.fromSemitones(this.semitones(fromString, fromFret, toString, toFret));
    }

    /**
     * Syntaxe 1: fret(note, string)
     * Syntaxe 2: fret(fromString, fromFret, toString, toFret, minFret, maxFret)
     * @returns {*}
     */
    fret() {
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

            //TODO: try to simplify the following corrections:

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

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @returns {*}
     */
    fretLow(fromString, fromFret, toString) {
        return this.fret(fromString, fromFret, toString, 0, fromFret);
    }

    /**
     *
     * @param fromString
     * @param fromFret
     * @param toString
     * @returns {*}
     */
    fretHigh(fromString, fromFret, toString) {
        return this.fret(fromString, fromFret, toString, fromFret, 0);
    }

    /**
     *
     * @param note : string, can be pitch (with octave) or pitch-class (without octave)
     * @param fromString : number
     * @param fromFret : number, min fret for the first string (fromString)
     * @param toString : number, value -1 means no limit (use all strings)
     * @param minFret : number
     * @param maxFret : number, value -1 means no limit (up to fretboard.maxFret)
     * @returns {*}
     */
    find(note, {fromString = 0, fromFret = 0, toString = this.numberOfStrings - 1, minFret = 0, maxFret = this.maxFret} = {}) {

        Assert.true(fromString >= 0);

        if (fromString >= this.numberOfStrings) return null;

        Assert.true(fromFret >= 0);
        Assert.true(minFret >= 0);
        Assert.true(minFret <= maxFret);
        Assert.true(fromFret <= maxFret);

        const withOctave = Note.oct(note) !== null;
        const t = withOctave ? this.tuning : this.tuningPitchClasses;

        let string = fromString;
        let fret = -1;
        while (true) {

            let d = Distance.semitones(t[string], note);

            if (d < 0) {    // should only occurs when using octaves
                break;
            }

            if (!withOctave && (string === fromString) && (d < fromFret)) {
                while (d < fromFret) d += 12;    // add one octave
            }

            if (d > maxFret) {
                string++;
                if (string > toString) break;
                continue;
            }

            if (string === fromString) {
                if (d >= fromFret) {
                    fret = d;
                    break;
                }
            } else {
                if (d >= minFret) {
                    fret = d;
                    break;
                }
            }

            break;

        }
        return fret < 0 ? null : {string, fret};
    }

    /**
     *
     * @param string
     * @param fret
     * @param fromString
     * @param toString
     * @param minFret
     * @param maxFret
     * @returns {*}
     */
    findNext({string, fret}, {toString = this.tuning.length, minFret = 0, maxFret = this.maxFret} = {}) {
        const note = this.note(string, fret);
        let s = string;
        let f = fret+1;
        if (f > maxFret) {
            // start at next string
            f = 0;
            s = s + 1;
        }
        if (s >= toString) return null;
        return this.find(Note.pc(note), {fromString: s, fromFret: f });
    }

    findPrev({string, fret}, {toString = 0, minFret = 0, maxFret = this.maxFret} = {}) {
        // TODO: implement findPrev()
        return null;
    }
    /**
     *
     * @param nameOrTonic
     * @param name
     * @param string min string to start from
     * @param fret min fret to start from
     * @param minNotesPerString
     * @param maxNotesPerString
     * @param maxFretDistance
     * @returns {null}
     */
    getScaleShape(name, string = 0, fret = 0, minNotesPerString = 1, maxNotesPerString = -1, maxFretDistance = -1) {

        let notes = Scale.intervals(name);

        return null;
    }


    toString() {
        let s = stringify(this);
        return s;
    }

} // Fretboard
