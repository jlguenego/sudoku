import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue, applySudokuRules } from "../check";
import { removePossibleValueSameSquare } from "./PossibleValue";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { row, col, value } = action.data;
    if (!checkValue(value)) {
        return state;
    };
    if (state.getIn(['rows', row, col, 'isOriginal']) === true) {
        return state;
    }
    if (value) {
        const newState = applySudokuRules(state, action.data);
        if (newState !== state) {
            window.alert('Baaahhhh! Error ! Try again !!!');
            return newState;
        }
    }
    let newState = state.updateIn(['rows', row, col, 'value'], v => {
        return value;
    });
    newState = newState.updateIn(['rows', row, col, 'possibleValues'], v => v.clear());

    // remove the value on the same square
    newState = removePossibleValueSameSquare(newState, action.data);
    // remove the value on the same row
    // remove the value on the same col

    return newState;
}