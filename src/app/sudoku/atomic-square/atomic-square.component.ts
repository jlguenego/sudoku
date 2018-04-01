import { Component, OnInit } from '@angular/core';
import { Square } from '../../model/square';

let value = 0;

@Component({
  selector: 'sdk-atomic-square',
  templateUrl: './atomic-square.component.html',
  styleUrls: ['./atomic-square.component.scss']
})
export class AtomicSquareComponent implements OnInit {

  constructor() { }

  square: Square;

  ngOnInit() {
    value++;
    this.square = new Square();
    this.square.isOriginal = true;
    this.square.value = value % 9 + 1;
  }

}
