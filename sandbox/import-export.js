
function create(s) {
    return s;
}

function isFoo(s) {
    return true;
}

const Shape = {
    create,
    isFoo
};

Shape.create({});
Shape.isFoo({});

