import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { ImmutableSudokuState } from '../../model/sudoku-state';
import { DifficultyEnum } from '../../model/difficulty.enum';
import { ActionType } from '../../model/action-type';
import { getGrid } from '../../model/grid';

import * as firebase from 'firebase/app';
require('firebase/database');
require('firebase/auth');

@Component({
  selector: 'sdk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  state: ImmutableSudokuState;
  difficulty: DifficultyEnum;
  user;

  constructor(private store: Store<AppState>, public cd: ChangeDetectorRef) { }


  ngOnInit() {
    this.store.subscribe((store) => {
      this.state = store.state;
      this.difficulty = store.state.get('difficulty', DifficultyEnum.EASY);
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      this.cd.detectChanges();
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

  save() {
    console.log('save');
    const json = JSON.stringify(this.state.toJS());
    console.log('json', json);
    console.log('current user', firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    console.log('user.uid', user.uid);
    firebase.database().ref().child('users').child(user.uid).set({
      difficulty: this.difficulty,
      sudokuState: json
    });
  }

  restore() {
    console.log('restore');
    console.log('current user', firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    firebase.database().ref().child('users').child(user.uid).on('value', (snapshot) => {
      const val = snapshot.val();
      const json = val.sudokuState;
      
      const state = JSON.parse(json);
      console.log('state', state);
      
      this.store.dispatch({
        type: ActionType.RESTORE,
        data: { value: state }
      });
      console.log('order sent');
    });
  }

}
