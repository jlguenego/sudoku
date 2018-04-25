import { SudokuSolver } from '@jlguenego/sudoku-generator';

import { Square, ImmutableSquare } from "./square";
import { CommandMode } from "../model/command-mode.enum";

import { Record, List } from 'immutable';
import { DifficultyEnum } from './difficulty.enum.js';

interface SudokuStateProps {
    rows: List<List<ImmutableSquare>>;
    commandValue: number;
    commandMode: CommandMode;
    errors: List<string>;
    solutionStr: string;
    difficulty: DifficultyEnum;
}

export type ImmutableSudokuState = Record<SudokuStateProps>;
export type ImmutableSudokyStateFactory = Record.Factory<SudokuStateProps>;


export const SudokuState: ImmutableSudokyStateFactory = Record({
    rows: List<List<ImmutableSquare>>([]),
    commandValue: 0,
    commandMode: CommandMode.REAL,
    errors: List<string>([]),
    solutionStr: '',
    difficulty: 0,
});







