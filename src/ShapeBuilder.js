import { Scale } from "tonal";

/**
 *
 * @param nameOrTonic
 * @param name
 * @param string
 * @param fret
 * @param minNotesPerString
 * @param maxNotesPerString
 * @param maxFretDistance
 * @returns {null}
 */
function fromScale(nameOrTonic, {name = null, string = 0, fret = 0, minNotesPerString = 1, maxNotesPerString = -1, maxFretDistance = -1} = {}) {

    let notes = Scale.notes(nameOrTonic, name);

    return null;
}

