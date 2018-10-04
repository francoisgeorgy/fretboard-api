import {Shape} from "../src/Shape";
import {CAGED} from '../src/data';

for (const name in CAGED) {
    console.log(new Shape(CAGED[name]));
    console.log();
}

