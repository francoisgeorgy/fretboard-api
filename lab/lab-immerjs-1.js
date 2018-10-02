import produce from "immer"

const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
];

const nextState = produce(baseState, draftState => {
    draftState.push({todo: "Tweet about it"});
    draftState[1].done = true;
});

console.log(JSON.stringify(baseState));
console.log(JSON.stringify(nextState));
console.log(baseState === nextState);   // false
console.log(baseState[0] === nextState[0]);   // true
console.log(baseState[1] === nextState[1]);   // false

const a = 1;
const b = produce(a, draftState => {});
const c = produce(a, draftState => {a});

console.log(a);
console.log(b);
console.log(a === b);   // true
console.log(a === c);   // true

