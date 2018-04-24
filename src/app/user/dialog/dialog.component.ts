import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sdk-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() show: boolean = false;

  @Output() close = new EventEmitter<undefined>();

  onClose() {
    console.log('onClose');
    this.close.emit();
  }
}
