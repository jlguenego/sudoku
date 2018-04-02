import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../model/app-state';
import { ImmutableSquare } from '../model/square';
import { List } from 'immutable';
import { ImmutableSudokuState } from '../model/sudoku-state';
import { getGrid, isSquareContaining } from '../model/grid';

@Injectable()
export class HighlightingService {

  state: ImmutableSudokuState;
  value: number = 0;
  highlightRows: boolean[];
  highlightCols: boolean[];
  highlightSquare: boolean[][];

  toggle(value: number): void {
    if (this.value === value) {
      this.value = 0;
    } else {
      this.value = value;
    }
    this.refresh();
  }

  refresh() {
    const grid = getGrid(this.state);
    this.reset();
    if (this.value === 0) {
      return;
    }
    this.highlightRows = this.highlightRows.map(
      (n, i) => grid[i].find(n => n === this.value) !== undefined);
    this.highlightCols = this.highlightCols.map(
      (n, i) => grid.map(row => row[i]).find(n => n === this.value) !== undefined);
    console.log('this.highlightRows', this.highlightRows);
    console.log('this.highlightCols', this.highlightCols);
    this.highlightSquare = this.highlightSquare.map(
      (row, i) => row.map((col, j) => isSquareContaining(grid, i, j, this.value))
    );
    console.log('this.highlightSquare', this.highlightSquare);
  }

  reset() {
    this.highlightRows = new Array(9).fill(false);
    this.highlightCols = new Array(9).fill(false);
    this.highlightSquare = new Array(3).fill(new Array(3).fill(false));
  }

  constructor(private store: Store<AppState>) {
    this.reset();
    this.store.subscribe((store) => {
      this.state = store.state;
      this.refresh();
    });
  }

}
