import { ImmutableSudokuState } from "./sudoku-state";
import { ActionType } from "./action-type";
import { SudokuAction } from "./sudoku-action";

import { set } from "./reducer/set";
import { setCommandValue } from "./reducer/setCommandValue";
import { togglePossibleValue } from "./reducer/PossibleValue";
import { setDifficulty } from "./reducer/setDifficulty";
import { newSudoku } from "./reducer/newSudoku";
import { restore } from "./reducer/restore";

const initialState: ImmutableSudokuState = newSudoku();

export function sudokuReducer(state: ImmutableSudokuState = initialState, action: SudokuAction) {
    switch (action.type) {

        case ActionType.SET_VALUE:
            const newState = set(state, action);
            return newState;

        case ActionType.REMOVE_VALUE:
            const data = { value: 0, ...action.data };
            return set(state, { ...action, data });

        case ActionType.SET_COMMAND_VALUE:
            return setCommandValue(state, action);

        case ActionType.SET_COMMAND_MODE:
            return state.set('commandMode', action.data.value);

        case ActionType.TOGGLE_POSSIBLE_VALUE:
            return togglePossibleValue(state, action);

        case ActionType.GENERATE_NEW_SUDOKU:
            return newSudoku(action.data.difficulty, state);

        case ActionType.SET_DIFFICULTY:
            return setDifficulty(state, action);

        case ActionType.RESTORE:
            return restore(action.data.value);

        default:
            return state;
    }
}
