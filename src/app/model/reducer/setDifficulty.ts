import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";

export function setDifficulty(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const newState = state.set('difficulty', action.data.difficulty);
    return newState;
}

