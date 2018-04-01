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
    const button = event.target;
    const buttons = button.parentNode.querySelectorAll('button.digit');
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    this.value = digit;
    this.store.dispatch({
      type: ActionType.SET_COMMAND_VALUE,
      data: { value: this.value }
    });
  }

  setAssistantMode() {
    this.mode = CommandMode.ASSISTANT;
  }

  setRealMode() {
    this.mode = CommandMode.REAL;
  }

  isAssistantMode() {
    return this.mode === CommandMode.ASSISTANT;
  }

  isRealMode() {
    return this.mode === CommandMode.REAL;
  }

}
