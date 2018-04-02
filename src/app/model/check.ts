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
    if (checkSquare(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checksquare'));
    }
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
    return result;
}
function checkCol(grid: number[][], data: SudokuActionData) {
    const { value, row, col } = data;
    const sudokuCol = grid.map(row => row[col]);
    const result = (sudokuCol.find(n => n === value) === undefined);
    return result;
}
function checkSquare(grid: number[][], data: SudokuActionData) {
    const { value, row, col } = data;
    const sudokuSquare = getSquare(grid, row, col);
    console.log('sudokuSquare', sudokuSquare);
    const result = sudokuSquare.find(row => row.find(v => v === value) !== undefined) === undefined;
    return result;
}
function getSquare(grid: number[][], row: number, col: number): number[][] {
    const squareRow = Math.floor(row / 3);
    const squareCol = Math.floor(col / 3);
    return grid.slice(squareRow * 3, (squareRow + 1) * 3)
        .map(row => row.slice(squareCol * 3, (squareCol + 1) * 3));
}