type Flat = 'b'| '♭'
type Sharp = '#'| '♯'
type Accidental = Flat | Sharp
type Octave = number
type Note = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type ImpossibleNotes = `${'E' | 'B'}${Sharp}` | `${'F' | 'C'}${Flat}`;

export type ScientificNoteWithAccidental = Exclude<
  `${Note}${Accidental}`,
  ImpossibleNotes
>;
export type ScientificNote = `${ScientificNoteWithAccidental | Note}${
  | Octave
  | ''}`;


export interface IBar {
    note:ScientificNote,
    length:number
}