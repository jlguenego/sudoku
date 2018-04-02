import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";

export function addPossibleValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const {value, row, col} = action.data;
    if (value < 0 || value > 9) {
        return this;
    }
    if (!Number.isInteger(value)) {
        return this;
    }
    if (state.getIn(['rows', row, col, 'isOriginal'])) {
        return this;
    }
    return state.updateIn(['rows', row, col, 'possibleValues'], values => values.push(value));
}
