import { Square, ImmutableSquare } from "./square";
import { CommandMode } from "../sudoku/command-mode.enum";

import { Record, List, fromJS } from 'immutable';

interface SudokuStateProps {
    rows: List<List<ImmutableSquare>>;
    commandValue: number;
    commandMode: CommandMode;
}

export type ImmutableSudokuState = Record<SudokuStateProps>;
export type ImmutableSudokyStateFactory = Record.Factory<SudokuStateProps>;


export const SudokuState: ImmutableSudokyStateFactory = Record({
    rows: List<List<ImmutableSquare>>([]), commandValue: 0, commandMode: CommandMode.REAL
});

const str =
    '000005037' +
    '006000000' +
    '050370120' +

    '000040702' +
    '000018604' +
    '000500080' +

    '041000000' +
    '000000873' +
    '000080001';

function makeImmutableSudokuState(str: string): ImmutableSudokuState {
    if (!str || str.length !== 81) {
        throw new Error(`Cannot initiate from an not well formatted string: ${str}`);
    }
    const rows = [];
    let i = 0, j = 0;
    let row;
    for (let c of str) {
        if (j === 0) {
            row = [];
            rows.push(row);
        }
        const d = +c;
        const square: ImmutableSquare = new Square({ value: +c, isOriginal: (+c !== 0) });
        // console.log('square', square);
        row.push(square);
        if (j === 8) {
            j = 0;
            i++;
        } else {
            j++;
        }
    }
    const immutableRows = fromJS(rows);
    console.log('immutableRows', immutableRows);
    return new SudokuState({ rows: immutableRows });
}

const state: ImmutableSudokuState = makeImmutableSudokuState(str);

export const initialState = state;


// export class SudokuState2 {

   

   

//     remove(row: number, col: number): SudokuState {
//         return this.set(row, col, 0);
//     }





//     addPossibleValue(row: number, col: number, value: number) {
//         if (value < 0 || value > 9) {
//             return this;
//         }
//         if (!Number.isInteger(value)) {
//             return this;
//         }
//         if (this.rows[row][col].get('isOriginal', false)) {
//             return this;
//         }
//         const result = SudokuState.from(this);
//         result.rows = this.rows.slice();
//         result.rows[row] = this.rows[row].slice();
//         const square = result.rows[row][col];
//         result.rows[row][col] = square.updateIn(['possibleValues'], values => values.push(value));
//         return result;
//     }


// }





