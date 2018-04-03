import './sudoku.js';

import { Square, ImmutableSquare } from "./square";
import { CommandMode } from "../model/command-mode.enum";

import { Record, List, fromJS } from 'immutable';

interface SudokuStateProps {
    rows: List<List<ImmutableSquare>>;
    commandValue: number;
    commandMode: CommandMode;
    errors: List<string>;
    solutionStr: string;
}

export type ImmutableSudokuState = Record<SudokuStateProps>;
export type ImmutableSudokyStateFactory = Record.Factory<SudokuStateProps>;


export const SudokuState: ImmutableSudokyStateFactory = Record({
    rows: List<List<ImmutableSquare>>([]),
    commandValue: 0,
    commandMode: CommandMode.REAL,
    errors: List<string>([]),
    solutionStr: '',
});

const sudoku = window['sudoku'];

const s = sudoku.generate("easy");
const sol = sudoku.solve(s);

const str = s.replace(/[.]/g, '0');

const solutionStr = sol.replace(/[.]/g, '0');

function makeImmutableSudokuState(str: string, solutionStr: string): ImmutableSudokuState {
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
    return SudokuState({ rows: immutableRows, solutionStr });
}

export const initialState: ImmutableSudokuState = makeImmutableSudokuState(str, solutionStr);

