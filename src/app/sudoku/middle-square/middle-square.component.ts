import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sdk-middle-square',
  templateUrl: './middle-square.component.html',
  styleUrls: ['./middle-square.component.css']
})
export class MiddleSquareComponent implements OnInit {

  @Input() row: number;
  @Input() col: number;

  constructor() { }

  ngOnInit() {
  }

}
