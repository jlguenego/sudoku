import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue } from "../check";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { row, col, value } = action.data;
    if (!checkValue(value)) {
        return this;
    };
    if (state.getIn(['rows', row, col, 'isOriginal']) === true) {
        return this;
    }
    const newState = state.updateIn(['rows', row, col, 'value'], v => {
        return value;
    });
    return newState;
}