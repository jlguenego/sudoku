import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../model/app-state';
import { ImmutableSquare } from '../model/square';
import { List } from 'immutable';
import { ImmutableSudokuState } from '../model/sudoku-state';
import { getGrid } from '../model/grid';

@Injectable()
export class HighlightingService {

  state: ImmutableSudokuState;
  value: number = 0;
  highlightRows: number[];
  highlightCols: number[];

  toggle(value: number): void {
    if (this.value === value) {
      this.value = 0;
    } else {
      this.value = value;
    }
    this.refresh();
  }

  refresh() {
    console.log('this.value', this.value)
    const grid = getGrid(this.state);
    this.reset();
    this.highlightRows.map((n, i) => {
      return grid[i].find(n => n === this.value) !== undefined
    });
    console.log('this.highlightRows', this.highlightRows);
  }

  reset() {
    this.highlightRows = new Array(9).fill(false);
    this.highlightCols = new Array(9).fill(false);
  }

  constructor(private store: Store<AppState>) {
    this.reset();
    this.store.subscribe((store) => {
      this.state = store.state;
    });
  }

}
