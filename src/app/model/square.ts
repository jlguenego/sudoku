import { Record, List } from 'immutable';

interface SquareProps {
    value: number;
    isOriginal: boolean;
    possibleValues: List<number>;
}

export type ImmutableSquare = Record<SquareProps>;

export const Square = Record({ value: 0, isOriginal: false, possibleValues: List<number>() });



