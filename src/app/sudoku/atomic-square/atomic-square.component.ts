import { Component, OnInit, Input } from '@angular/core';
import { ImmutableSquare } from '../../model/square';
import { SudokuState } from '../../model/sudoku-state';
import { Store, select } from '@ngrx/store';
import { ActionType } from '../../model/action-type';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../model/app-state';
import { CommandMode } from '../command-mode.enum';

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

  square: ImmutableSquare;
  commandValue: number;
  mode: CommandMode;

  ngOnInit() {
    this.store.subscribe((store) => {
      this.square = store.state.get('rows', undefined).get(this.row).get(this.col);
      // this.square.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.commandValue = store.state.get('commandValue', undefined);
      this.mode = store.state.get('commandMode', undefined);
    });
  }

  onClick(event) {
    if (this.commandValue === 0) {
      return;
    }
    if (this.square.get('value', undefined) !== 0) {
      this.store.dispatch({
        type: ActionType.REMOVE_VALUE,
        data: { row: this.row, col: this.col }
      });
      return;
    }
    let type = ActionType.SET_VALUE;
    if (this.mode === CommandMode.ASSISTANT) {
      type = ActionType.TOGGLE_POSSIBLE_VALUE;
    }
    this.store.dispatch({
      type: type,
      data: { row: this.row, col: this.col, value: this.commandValue }
    });
  }

}
