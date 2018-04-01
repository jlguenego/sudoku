import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommandMode } from '../command-mode.enum';

@Component({
  selector: 'sdk-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  public mode: CommandMode = CommandMode.REAL;
  public value: number;

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) { }



  ngOnInit() {
  }

  onSelectDigit(event, digit) {
    console.log('event', event);
    const button = event.target;
    const buttons = button.parentNode.querySelectorAll('button.digit');
    console.log('buttons', buttons);
    buttons.forEach(btn => {
      console.log('btn', btn.classList);
      btn.classList.remove('active');
    });
    button.classList.add('active');
    this.value = digit;
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
