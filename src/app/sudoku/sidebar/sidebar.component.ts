import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { ImmutableSudokuState } from '../../model/sudoku-state';
import { DifficultyEnum } from '../../model/difficulty.enum';

@Component({
  selector: 'sdk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  state: ImmutableSudokuState;
  difficulty: DifficultyEnum;
  
  constructor(private store: Store<AppState>) { }

  
  ngOnInit() {
    this.store.subscribe((store) => {
      this.state = store.state;
      this.difficulty = store.state.get('difficulty', DifficultyEnum.EASY);
    });
  }

}
