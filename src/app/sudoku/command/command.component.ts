import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommandMode } from '../command-mode.enum';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { ActionType } from '../../model/action-type';

@Component({
  selector: 'sdk-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  public mode: CommandMode = CommandMode.REAL;
  public value: number;

  constructor(private element: ElementRef,
     private cd: ChangeDetectorRef,
     private store: Store<AppState>) { }



  ngOnInit() {
  }

  onSelectDigit(event, digit) {
    this.value = digit;
    this.store.dispatch({
      type: ActionType.SET_COMMAND_VALUE,
      data: { value: this.value }
    });
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
