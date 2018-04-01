import { SudokuState, initialState } from "./sudoku-state";
import { ActionType } from "./action-type";
import { SudokuAction } from "./sudoku-action";

export function sudokuReducer(state: SudokuState = initialState, action: SudokuAction) {
    switch (action.type) {

        case ActionType.SET_VALUE:
            state = state.set(action.data.row, action.data.col, action.data.value);
            return state;

        case ActionType.REMOVE_VALUE:
            return state.remove(action.data.row, action.data.col);

        default:
            return state;
    }
}
