import { Component, OnInit, Input } from '@angular/core';
import { Square } from '../../model/square';
import { SudokuState } from '../../model/sudoku-state';
import { Store } from '@ngrx/store';
import { ActionType } from '../../model/action-type';

let value = 0;

@Component({
  selector: 'sdk-atomic-square',
  templateUrl: './atomic-square.component.html',
  styleUrls: ['./atomic-square.component.scss']
})
export class AtomicSquareComponent implements OnInit {

  @Input() row: number;
  @Input() col: number;

  constructor(private store: Store<SudokuState>) { }

  square: Square;

  ngOnInit() {
    value++;
    this.square = new Square(value % 9 + 1);
    this.square.isOriginal = true;
    this.square.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  onClick(event) {
    console.log('onClick', event, this);
    this.store.dispatch({
      type: ActionType.SET_VALUE,
      data: { row: this.row, col: this.col, value: 2 }
    });
  }

}
