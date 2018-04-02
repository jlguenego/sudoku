import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue } from "../check";

export function togglePossibleValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const {value, row, col} = action.data;
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
