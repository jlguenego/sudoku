import { Square } from "./square";

export class SudokuState {
   
    // 9 rows and 9 columns
    rows: Square[][];

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
            const square = new Square(+c);
            row.push(square);
            if (j === 8) {
                j = 0;
                i++;
            } else {
                j++;
            }
        }

    }

    set(row: number, col: number, value: number): SudokuState {
        const result = new SudokuState();
        result.rows = this.rows.slice();
        result.rows[row] = this.rows[row].slice();
        result.rows[row][col] = new Square(value);
        return result;
    }

    remove(row: number, col: number): SudokuState {
        return this.set(row, col, 0);
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

