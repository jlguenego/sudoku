import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue, applySudokuRules } from "../check";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { row, col, value } = action.data;
    if (!checkValue(value)) {
        return state;
    };
    if (state.getIn(['rows', row, col, 'isOriginal']) === true) {
        return state;
    }
    let newState = applySudokuRules(state, action.data);
    if (newState !== state) {
        window.alert('Baaahhhh! Error ! Try again !!!');
        return newState;
    }
    newState = state.updateIn(['rows', row, col, 'value'], v => {
        return value;
    });
    return newState;
}