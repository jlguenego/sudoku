import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { ImmutableSudokuState } from '../../model/sudoku-state';
import { DifficultyEnum } from '../../model/difficulty.enum';
import { ActionType } from '../../model/action-type';
import { getGrid } from '../../model/grid';

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

  generate() {
    console.log('generate', this.difficulty);
    this.store.dispatch({
      type: ActionType.GENERATE_NEW_SUDOKU,
      data: { difficulty: this.difficulty }
    });
  }

  log() {
    const grid = getGrid(this.state);
    const str = grid.map(r => r.join('')).join('');
    console.log('actual grid', str);
  }

}
