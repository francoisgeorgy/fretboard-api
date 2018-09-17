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
        this.minFret = 0;
        this.maxFret = frets;
        this.shapes = [];
        this.nextID = 0;
        this.computeTuningIntervals();
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
            //         this.tuning[(i -1 + this.tuning.length) % this.tuning.length],
            //         this.tuning[i]
            //     )
            // );
        }
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
     * @param note
     * @param fromString
     * @param fromFret
     * @param toString
     * @param toFret
     */
    findNote(note, fromString = 0, minFret = 0, maxFret = -1) {
        Assert.true(fromString >= 0);
        Assert.true(fromString < this.tuning.length);
        Assert.true(minFret >= 0);
        // let n = Note.props(note);
        // let octave = n.oct === null ? Note.props(this.tuning[fromString]).oct : n.oct;
        // console.log(octave);
        let m = maxFret < 0 ? this.maxFret : Math.min(maxFret, this.maxFret);

        Assert.true(minFret <= m);

        let string = fromString;
        let fret = -1;
        while (true) {
            let d = Distance.semitones(this.tuning[string], note);
            // console.log(string, this.tuning[string], note, d);
            if (d < 0) break;
            if (d > m) {
                string++;
                if (string === this.tuning.length) break;
                continue;
            }
            if (d >= minFret) {
                fret = d;
                break;
            }
        }
        return fret < 0 ? null : {string, fret};
    }

    /**
     *
     * @param string
     * @param fret
     */
    findNextNote(string, fret) {
        let note = this.note(string, fret);
        return this.findNote(note, string+1);
    }

    /**
     * minfret will be fret
     * @param string
     * @param fret
     */
    findNextNoteForward(string, fret) {

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
