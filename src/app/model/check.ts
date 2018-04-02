import { ImmutableSudokuState } from "./sudoku-state";
import { SudokuActionData } from "./sudoku-action";

export function checkValue(value: number) {
    if (value < 0 || value > 9) {
        return false;
    }
    if (!Number.isInteger(value)) {
        return false;
    }
    return true;
}

export function checkSudokuRules(state: ImmutableSudokuState, data: SudokuActionData) {
    return checkrow(state, data) &&
        checkCol(state, data) &&
        checkSquare(state, data);
}

function checkrow(state: ImmutableSudokuState, data: SudokuActionData) {
    console.log('data', data);
    const {value, row, col} = data;
    const sudokuRow = state.getIn(['rows', row]).toArray();
    console.log('sudokuRow', sudokuRow);
    return true;
}
function checkCol(state: ImmutableSudokuState, data: SudokuActionData) {
    return true;
}
function checkSquare(state: ImmutableSudokuState, data: SudokuActionData) {
    return true;
}