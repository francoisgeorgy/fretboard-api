
export type TuningType = { [name: string]: string[] };

const bass4: TuningType = {
    standard : ['E1', 'A1', 'D2', 'G2'],
    drop_d : ['D1', 'A1', 'D2', 'G2']
};

const guitar6: TuningType = {
    standard : ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        standard_d : ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
        drop_d : ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        drop_c : ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
        double_drop_d : ['D2', 'A2', 'D3', 'G3', 'B3', 'D4'],
        dadgad : ['D2', 'A2', 'D3', 'G3', 'A3', 'D4']
};

const bass: TuningType = bass4;
const guitar: TuningType = guitar6;

export const Tuning = {
    bass,
    bass4,
    guitar,
    guitar6
};

/*
export const Tunings: { [name: string]: TuningType } = {
    bass4: {
        standard : ['E1', 'A1', 'D2', 'G2'],
        drop_d : ['D1', 'A1', 'D2', 'G2']
    },
    bass5: {
        standard : ['B0', 'E1', 'A1', 'D2', 'G2'],
        tenor : ['E1', 'A1', 'D2', 'G2', 'C3']
    },
    bass6: {
        standard : ['B0', 'E1', 'A1', 'D2', 'G2', 'C3']
    },
    guitar6: {
        standard : ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        standard_d : ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
        drop_d : ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        drop_c : ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
        double_drop_d : ['D2', 'A2', 'D3', 'G3', 'B3', 'D4'],
        dadgad : ['D2', 'A2', 'D3', 'G3', 'A3', 'D4']
    },
    guitar7: {  // 7 strings guitar
        standard : ['B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        drop_a : ['A1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    },
    guitar8: {  // 8 strings guitar
        standard : ['F#1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        drop_e : ['E1', 'B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    }
};

Tunings['bass'] = Tunings.bass4;
Tunings['guitar'] = Tunings.guitar6;
*/

// https://en.wikipedia.org/wiki/List_of_guitar_tunings
// https://en.wikibooks.org/wiki/Guitar/Alternate_Tunings
