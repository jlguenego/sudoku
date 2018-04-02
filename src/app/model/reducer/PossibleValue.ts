import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";

export function togglePossibleValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
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
    return state.updateIn(['rows', row, col, 'possibleValues'], pv => {
        const index = pv.findIndex(n => n === value);
        if (index !== -1) {
            return pv.splice(index, 1);
        }
        return pv.push(value);
    });
}
