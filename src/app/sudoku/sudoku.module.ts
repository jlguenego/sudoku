import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SudokuComponent } from './sudoku/sudoku.component';
import { GlobalSquareComponent } from './global-square/global-square.component';
import { MiddleSquareComponent } from './middle-square/middle-square.component';
import { AtomicSquareComponent } from './atomic-square/atomic-square.component';
import { CommandComponent } from './command/command.component';
import { StoreModule } from '@ngrx/store';
import { sudokuReducer } from '../model/reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HighlightingService } from './highlighting.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot({ state: sudokuReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  declarations: [SudokuComponent, GlobalSquareComponent, MiddleSquareComponent, AtomicSquareComponent, CommandComponent, SidebarComponent],
  exports: [SudokuComponent],
  providers: [
    HighlightingService
  ]

})
export class SudokuModule { }
