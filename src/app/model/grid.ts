import { ImmutableSudokuState } from "./sudoku-state";

export function getGrid(state: ImmutableSudokuState): number[][] {
    const grid = state.get('rows', undefined).toArray().map(n => n.toArray().map(r => r.get('value', 0)));
    return grid;
}