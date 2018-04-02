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

export function applySudokuRules(state: ImmutableSudokuState, data: SudokuActionData): ImmutableSudokuState {
    const grid: number[][] = getGrid(state);
    if (checkRow(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkrow'));
    }
    if (checkCol(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkcol'));
    }
    // checkSquare(grid, data);
    return state;
}

function getGrid(state: ImmutableSudokuState): number[][] {
    const grid = state.get('rows', undefined).toArray().map(n => n.toArray().map(r => r.get('value', 0)));
    return grid;
}

function checkRow(grid: number[][], data: SudokuActionData) {
    const { value, row, col } = data;
    const sudokuRow = grid[row];
    const result = (sudokuRow.find(n => n === value) === undefined);
    console.log('check row: ', result);
    return result;
}
function checkCol(grid: number[][], data: SudokuActionData) {
    const { value, row, col } = data;
    const sudokuCol = grid.map(row => row[col]);
    console.log('sudokuCol: ', sudokuCol);
    const result = (sudokuCol.find(n => n === value) === undefined);
    console.log('check col: ', result);
    return result;
}
function checkSquare(grid: number[][], data: SudokuActionData) {
    return true;
}