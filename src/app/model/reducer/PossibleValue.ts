import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction, SudokuActionData } from "../sudoku-action";
import { checkValue } from "../check";

export function togglePossibleValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { value, row, col } = action.data;
    if (!checkValue(value)) {
        return state;
    }
    if (state.getIn(['rows', row, col, 'isOriginal'])) {
        return state;
    }
    return state.updateIn(['rows', row, col, 'possibleValues'], pv => {
        const index = pv.findIndex(n => n === value);
        if (index !== -1) {
            return pv.splice(index, 1);
        }
        return pv.push(value);
    });
}

export function removePossibleValueSameSquare(
    state: ImmutableSudokuState,
    data: SudokuActionData): ImmutableSudokuState {

    const { row, col, value } = data;
    const rows = new Array(3).map((n, i) => i + 3 * Math.floor(row / 3));
    const cols = new Array(3).map((n, i) => i + 3 * Math.floor(col / 3));
    // rows.forEach(r => );
    const newState = state;
    return newState;
}
