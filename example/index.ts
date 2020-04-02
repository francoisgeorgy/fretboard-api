import {Shape} from "../src";
import "./main.css";
const stringify = require("json-stringify-pretty-compact");

function tag(tag, text) {
    const el = document.createElement(tag);
// var elem = document.createElement('div');
// elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
    el.textContent = text;
    return el;
}

function h2(text) {
    document.body.appendChild(tag("h2", text));
}

function div(text) {
    document.body.appendChild(tag("div", text));
}

h2('Shape.create("X02210")');

const s = Shape.create("X02210");

div(stringify(s, {indent:4}));

