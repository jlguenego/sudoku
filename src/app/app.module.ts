import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SudokuModule } from './sudoku/sudoku.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SudokuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
