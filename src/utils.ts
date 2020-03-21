import {Intervals} from "./shape";
import {Interval} from "tonal";

function intervalsSimple(intervals: Intervals): string[] {
    const simples: string[] = [];
    for (const string of intervals) {
        if (string == null) {
            continue;
        }
        for (const interval of string) {
            let simple = Interval.simplify(interval);
            if (simple) {
                if (Interval.ic(simple) === 0) simple = '1P';   //TODO: document this simplification
                //simples.push((string === this.root.string) && (interval_from_root === "1P") ? "R" : simple);
                if (!simples.includes(simple)) {
                    simples.push(simple);          // ! simpleIntervals are not sorted
                }
            } else {
                throw new Error(`invalid interval: ${interval}`)
            }
        }
    }
    return simples;
}

/**
 *
 * @param interval
 * @param compound
 * @returns {string}
 */
function intervalText(interval: string, compound=false): string {
    const props = Interval.props(interval);
    if (props.chroma === 0) return compound ? props.num.toString() : 'R';     // make optional
    if (props.num == null) {
        throw new Error(`invalid interval: ${interval}`);
    } else {
        const t = compound ? props.num.toString() : props.simple.toString();
        if ((props.q === 'M') || (props.q === 'P')) return t;
        return t + props.q;
    }
}

export const Utils = {
    intervalsSimple,
    intervalText
};
