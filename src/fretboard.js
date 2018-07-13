import {mandatory} from "./utils";
import {Shape} from "./shape";

/**
 *
 */
export class Fretboard {

    /**
     *
     * @param tuning
     */
    constructor({tuning = DEF_TUNING} = {}) {
        this.tuning = tuning;
        this.shapes = [];
        this.nextID = 0;
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
        this.shapes.forEach(function(s) {
            //TODO: only change shape's tuning if the shape was created WITH a tuning.
            s.setTuning(tuning);
        });
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

} // Fretboard
