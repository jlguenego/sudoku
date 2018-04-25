import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommandMode } from '../../model/command-mode.enum';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { ActionType } from '../../model/action-type';
import { ImmutableSudokuState } from '../../model/sudoku-state';

import { HighlightingService } from '../highlighting.service';
import { DifficultyEnum } from '../../model/difficulty.enum';

@Component({
  selector: 'sdk-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  public mode: CommandMode = CommandMode.REAL;
  public value: number;
  public errors: string[];
  public state: ImmutableSudokuState;

  constructor(private element: ElementRef,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>,
    private highlight: HighlightingService) { }



  ngOnInit() {
    this.store.subscribe((store) => {
      this.state = store.state;
      this.errors = store.state.get('errors', undefined).toArray();
      // this.square.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.value = store.state.get('commandValue', undefined);
      this.mode = store.state.get('commandMode', undefined);
    });
  }

  onSelectDigit(event, digit) {
    this.value = digit;
    this.store.dispatch({
      type: ActionType.SET_COMMAND_VALUE,
      data: { value: this.value }
    });
    this.highlight.on(digit);
  }

  setAssistantMode() {
    this.mode = CommandMode.ASSISTANT;
    this.store.dispatch({
      type: ActionType.SET_COMMAND_MODE,
      data: { value: this.mode }
    });
  }

  setRealMode() {
    this.mode = CommandMode.REAL;
    this.store.dispatch({
      type: ActionType.SET_COMMAND_MODE,
      data: { value: this.mode }
    });
  }

  isAssistantMode() {
    return this.mode === CommandMode.ASSISTANT;
  }

  isRealMode() {
    return this.mode === CommandMode.REAL;
  }

  

  

}
