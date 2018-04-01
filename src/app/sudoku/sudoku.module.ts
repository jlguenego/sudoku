import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuComponent } from './sudoku/sudoku.component';
import { GlobalSquareComponent } from './global-square/global-square.component';
import { MiddleSquareComponent } from './middle-square/middle-square.component';
import { AtomicSquareComponent } from './atomic-square/atomic-square.component';
import { CommandComponent } from './command/command.component';
import { StoreModule } from '@ngrx/store';
import { sudokuReducer } from '../model/reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ state: sudokuReducer })
  ],
  declarations: [SudokuComponent, GlobalSquareComponent, MiddleSquareComponent, AtomicSquareComponent, CommandComponent],
  exports: [SudokuComponent]
})
export class SudokuModule { }
