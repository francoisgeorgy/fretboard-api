import DummyClass from "../src/fretboard-api"

/**
 * Dummy test
 */
describe("Dummy test", () => {
    it("works if true is truthy", () => {
        expect(true).toBeTruthy()
    })

    it("DummyClass is instantiable", () => {
        expect(new DummyClass()).toBeInstanceOf(DummyClass)
    })

    it("Answer is 42", () => {
        expect(DummyClass.getAnswer()).toBe(42)
    })
})
