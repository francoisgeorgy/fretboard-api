import {Intervals} from "./Shape";
import {Interval} from "tonal";

export function intervalsSimple(intervals: Intervals): string[] {
    let simples: string[] = [];
    for (let string of intervals) {
        if (string == null) {
            continue;
        }
        for (let interval of string) {
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
