import { Component, OnInit, Input } from '@angular/core';
import { Square } from '../../model/square';
import { SudokuState } from '../../model/sudoku-state';
import { Store, select } from '@ngrx/store';
import { ActionType } from '../../model/action-type';
import { Observable } from 'rxjs/Observable';

interface AppState {
  state: SudokuState
}

@Component({
  selector: 'sdk-atomic-square',
  templateUrl: './atomic-square.component.html',
  styleUrls: ['./atomic-square.component.scss']
})
export class AtomicSquareComponent implements OnInit {

  @Input() row: number;
  @Input() col: number;

  constructor(private store: Store<AppState>) { 
  }

  square: Square;

  ngOnInit() {
    this.store.subscribe((store) => {
      console.log('observer got new store', store);
      console.log('state.rows', store.state.rows);

      console.log('this.row', this.row);
      console.log('this.col', this.col);
      this.square = store.state.rows[this.row][this.col];
      this.square.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    });
    
  }

  onClick(event) {
    console.log('onClick', event, this);
    this.store.dispatch({
      type: ActionType.SET_VALUE,
      data: { row: this.row, col: this.col, value: 2 }
    });
  }

}
