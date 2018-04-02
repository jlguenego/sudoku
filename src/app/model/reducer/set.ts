import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    console.log('set', action);
    const { row, col, value } = action.data;

    if (value < 0 || value > 9) {
        return this;
    }
    if (!Number.isInteger(value)) {
        return this;
    }
    if (state.get('rows', undefined).get(row).get(col).get('isOriginal', true)) {
        return this;
    }
    console.log('test passed');
    // list.setIn([3, 0], 999);
    const newState = state.updateIn(['rows', row, col, 'value'], v => {
        console.log('v', v);
        return value;
    });
    return newState;
}