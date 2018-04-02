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
    if (checkrow(grid, data) === false) {
        const newState = state.updateIn(['errors'], errors => errors.push('checkrow'));
        console.log('newState', newState);
        return newState;
    }
    // checkCol(grid, data) &&
    // checkSquare(grid, data);
    return state;
}

function getGrid(state: ImmutableSudokuState): number[][] {
    const grid = state.get('rows', undefined).toArray().map(n => n.toArray().map(r => r.get('value', 0)));
    return grid;
}

function checkrow(grid: number[][], data: SudokuActionData) {
    const { value, row, col } = data;
    const sudokuRow = grid[row];
    const result = (sudokuRow.find(n => n === value) === undefined);
    console.log('check row: ', result);
    return result;
}
function checkCol(grid: number[][], data: SudokuActionData) {
    return true;
}
function checkSquare(grid: number[][], data: SudokuActionData) {
    return true;
}