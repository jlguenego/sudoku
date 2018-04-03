import { Action } from "@ngrx/store";

export class SudokuAction implements Action {
    type: string;
    data?: SudokuActionData;
}

export interface SudokuActionData {
    value?: number;
    row?: number;
    col?: number;
}