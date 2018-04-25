import { SudokuState } from "../sudoku-state";
import { fromJS } from "immutable";

export function restore(stateObj) {
    console.log('stateObj', stateObj);
    const result = fromJS(stateObj)
    return result;
}