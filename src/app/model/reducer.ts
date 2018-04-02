import { ImmutableSudokuState, initialState } from "./sudoku-state";
import { ActionType } from "./action-type";
import { SudokuAction } from "./sudoku-action";

import { set } from "./reducer/set";
import { setCommandValue } from "./reducer/setCommandValue";

export function sudokuReducer(state: ImmutableSudokuState = initialState, action: SudokuAction) {
    switch (action.type) {

        case ActionType.SET_VALUE:
            const newState = set(state, action);
            return newState;

        case ActionType.REMOVE_VALUE:
            const data = {value: 0, ...action.data};
            return set(state, {...action, data});

        case ActionType.SET_COMMAND_VALUE:
            return setCommandValue(state, action);

        case ActionType.SET_COMMAND_MODE:
            return state.set('commandMode', action.data.value);

        // case ActionType.ADD_POSSIBLE_VALUE:
        //     return state.addPossibleValue(action.data.row, action.data.col, action.data.value);

        default:
            return state;
    }
}
