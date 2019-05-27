import { Interval } from "tonal";

/**
 *
 * @param interval
 * @param compound
 * @returns {string}
 */
export function intervalText(interval, compound=false) {
    let props = Interval.props(interval);
    if (props.chroma === 0) return compound ? props.num.toString() : 'R';     // make optional
    let t = compound ? props.num.toString() : props.simple.toString();
    if ((props.q === 'M') || (props.q === 'P')) return t;
    return t + props.q;
}
