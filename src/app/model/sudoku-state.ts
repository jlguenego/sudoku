import { Square, ImmutableSquare } from "./square";
import { CommandMode } from "../sudoku/command-mode.enum";

export class SudokuState {

    // 9 rows and 9 columns
    rows: ImmutableSquare[][];
    commandValue: number;
    commandMode: CommandMode = CommandMode.REAL;

    constructor(str?: string) {
        if (!str) {
            return;
        }
        if (str.length !== 81) {
            throw new Error('cannot initiate a sudoku from string different of 81 characters.')
        }
        this.rows = [];
        let i = 0, j = 0;
        let row;
        for (let c of str) {
            if (j === 0) {
                row = [];
                this.rows.push(row);
            }
            const d = +c;
            const square: ImmutableSquare = new Square({ value: +c, isOriginal: (+c !== 0) });
            row.push(square);
            if (j === 8) {
                j = 0;
                i++;
            } else {
                j++;
            }
        }

    }

    static from(state: SudokuState) {
        let result = new SudokuState();
        return Object.assign(result, state);
    }

    set(row: number, col: number, value: number): SudokuState {
        if (value < 0 || value > 9) {
            return this;
        }
        if (!Number.isInteger(value)) {
            return this;
        }
        if (this.rows[row][col].get('isOriginal', false)) {
            return this;
        }
        const result = SudokuState.from(this);
        result.rows = this.rows.slice();
        result.rows[row] = this.rows[row].slice();
        result.rows[row][col] = new Square({ value });
        return result;
    }

    remove(row: number, col: number): SudokuState {
        return this.set(row, col, 0);
    }

    setCommandValue(value) {
        const result = SudokuState.from(this);
        result.commandValue = value;
        return result;
    }

    setCommandMode(value) {
        const result = SudokuState.from(this);
        result.commandMode = value;
        return result;
    }

    addPossibleValue(row: number, col: number, value: number) {
        if (value < 0 || value > 9) {
            return this;
        }
        if (!Number.isInteger(value)) {
            return this;
        }
        if (this.rows[row][col].get('isOriginal', false)) {
            return this;
        }
        const result = SudokuState.from(this);
        result.rows = this.rows.slice();
        result.rows[row] = this.rows[row].slice();
        const square = result.rows[row][col];
        result.rows[row][col] = square.updateIn(['possibleValues'], values => values.push(value));
        return result;
    }


}



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

const state = new SudokuState(str);

export const initialState = state;

