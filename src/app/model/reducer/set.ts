import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue, checkSudokuRules } from "../check";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { row, col, value } = action.data;
    if (!checkValue(value)) {
        return state;
    };
    if (state.getIn(['rows', row, col, 'isOriginal']) === true) {
        return state;
    }
    if (!checkSudokuRules(state, action.data)) {
        window.alert('error!');
        return state;
    }
    const newState = state.updateIn(['rows', row, col, 'value'], v => {
        return value;
    });
    return newState;
}