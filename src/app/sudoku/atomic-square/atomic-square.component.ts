import { Component, OnInit, Input } from '@angular/core';
import { ImmutableSquare } from '../../model/square';
import { SudokuState } from '../../model/sudoku-state';
import { Store, select } from '@ngrx/store';
import { ActionType } from '../../model/action-type';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../model/app-state';
import { CommandMode } from '../../model/command-mode.enum';
import { HighlightingService } from '../highlighting.service';

@Component({
  selector: 'sdk-atomic-square',
  templateUrl: './atomic-square.component.html',
  styleUrls: ['./atomic-square.component.scss']
})
export class AtomicSquareComponent implements OnInit {


  @Input() row: number;
  @Input() col: number;

  constructor(private store: Store<AppState>, private highlight: HighlightingService) {
  }

  square: ImmutableSquare;
  commandValue: number;
  mode: CommandMode;


  isOriginal: boolean;
  value: number;
  possibleValues: number[];


  ngOnInit() {
    this.store.subscribe((store) => {
      this.square = store.state.get('rows', undefined).get(this.row).get(this.col);
      this.isOriginal = this.square.get('isOriginal', undefined);
      this.value = this.square.get('value', undefined);
      this.possibleValues = this.square.get('possibleValues', undefined).toArray();
      // this.square.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.commandValue = store.state.get('commandValue', undefined);
      this.mode = store.state.get('commandMode', undefined);
    });
  }

  onClick(event) {
    const value = this.square.get('value', undefined);
    if (value > 0) {
      console.log('clicking on a already set square');
      this.highlight.toggle(value);
      this.store.dispatch({
        type: ActionType.SET_COMMAND_VALUE,
        data: { value }
      });
      return;
    };


    if (this.commandValue === 0) {
      return;
    }

    if (this.mode === CommandMode.ASSISTANT) {
      this.store.dispatch({
        type: ActionType.TOGGLE_POSSIBLE_VALUE,
        data: { row: this.row, col: this.col, value: this.commandValue }
      });
      return;
    }
    this.store.dispatch({
      type: ActionType.SET_VALUE,
      data: { row: this.row, col: this.col, value: this.commandValue }
    });
    this.highlight.on(this.commandValue);
  }

  isHighlighted(): boolean {
    return this.highlight.highlightRows[this.row]
      || this.highlight.highlightCols[this.col]
      || this.highlight.highlightSquare[Math.floor(this.row / 3)][Math.floor(this.col / 3)]
      || (this.highlight.value > 0 && this.square.get('value', 0) > 0);
  }

}
