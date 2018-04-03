import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { getGrid } from '../../model/grid';

@Component({
  selector: 'sdk-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  isFinished = false;

  constructor(private store: Store<AppState>) {
    this.store.subscribe((store) => {
      const grid = getGrid(store.state);
      grid.map(r => r.join('')).join('').indexOf('0') === -1 &&
        setTimeout(() => {
          if (this.isFinished === false) {
            window.alert('Congratulations! Finished!');
            this.isFinished = true;
          }
        }, 0);
    });
  }

  ngOnInit() {
  }

}
