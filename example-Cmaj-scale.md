
    const s = Shape.create("8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8");

      {
        frets: [
          [ 8, 10 ],
          [ 7, 8, 10 ],
          [ 7, 9, 10 ],
          [ 7, 9, 10 ],
          [ 8, 10 ],
          [ 7, 8 ]
        ],
        root: { string: 0, fret: 8 },
        position: { string: 0, fret: 8 },
        intervals: []
      }
    
    const p = Fretboard.play(s);
    
      {
        frets: [
          [ 8, 10 ],
          [ 7, 8, 10 ],
          [ 7, 9, 10 ],
          [ 7, 9, 10 ],
          [ 8, 10 ],
          [ 7, 8 ]
        ],
        root: { string: 0, fret: 8 },
        position: { string: 0, fret: 8 },
        tuning: [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ],
        intervals: [
          [ '1P', '2M' ],
          [ '3M', '4P', '5P' ],
          [ '6M', '7M', '8P' ],
          [ '9M', '10M', '11P' ],
          [ '12P', '13M' ],
          [ '14M', '15P' ]
        ],
        notes: [
          [ 'C3', 'D3' ],
          [ 'E3', 'F3', 'G3' ],
          [ 'A3', 'B3', 'C4' ],
          [ 'D4', 'E4', 'F4' ],
          [ 'G4', 'A4' ],
          [ 'B4', 'C5' ]
        ]
      }

Note: `notes`, `intervals` always has the same number of elements as `frets`. 