import {intervalText} from "../src/humanizer";

test('intervalText', () => {

    expect(intervalText("1P")).toEqual("R");
    expect(intervalText("8P")).toEqual("R");
    expect(intervalText("15P")).toEqual("R");

    expect(intervalText("8P", true)).toEqual("8");
    expect(intervalText("15P", true)).toEqual("15");

    expect(intervalText("1P")).toEqual("R");
    expect(intervalText("2m")).toEqual("2m");
    expect(intervalText("2M")).toEqual("2");
    expect(intervalText("3m")).toEqual("3m");
    expect(intervalText("3M")).toEqual("3");
    expect(intervalText("4P")).toEqual("4");
    expect(intervalText("5P")).toEqual("5");
    expect(intervalText("6m")).toEqual("6m");
    expect(intervalText("6M")).toEqual("6");
    expect(intervalText("7m")).toEqual("7m");
    expect(intervalText("7M")).toEqual("7");
    expect(intervalText("8P")).toEqual("R");

    expect(intervalText("4A")).toEqual("4A");
    expect(intervalText("5A")).toEqual("5A");

    expect(intervalText("4d")).toEqual("4d");
    expect(intervalText("5d")).toEqual("5d");

});

