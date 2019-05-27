
const o = {
    a: 1,
    b: 2,
    c: 3
};

console.log(Object.keys(o));

console.log(JSON.stringify(o));

o.a = 42;
console.log(JSON.stringify(o));

const p = {};

Object.defineProperty(p, 'a', {
    value: 42,
    writable: false
});


console.log(Object.keys(p));

console.log(JSON.stringify(p));
