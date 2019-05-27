const a = {
    p: 1,
    q: 2,
    r: 3
};

const {p, ...rest} = a;
console.log(rest);          // { q: 2, r: 3 }

