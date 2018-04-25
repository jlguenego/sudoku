import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { ActionType } from '../../model/action-type';
require('firebase/auth');
require('firebase/database');


@Component({
  selector: 'sdk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isLogged = false;
  showSignInDialog = false;
  showSignUpDialog = false;

  email: string;
  password: string;

  name: string;
  difficulty: number = 0;

  constructor(public cd: ChangeDetectorRef, private store: Store<AppState>) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('authenticated', user);
        this.email = user.email;
        this.isLogged = true;
        firebase.database().ref().child('users').child(user.uid).on("value", (snapshot) => {
          const val = snapshot.val();
          console.log('snapshot', val);
          this.difficulty = +val.difficulty;
          console.log('difficulty', this.difficulty);
          this.store.dispatch({
            type: ActionType.SET_DIFFICULTY,
            data: { difficulty: this.difficulty }
          });
        });

        
      } else {
        console.log('not authenticated', user);
        setTimeout(() => {
          console.log('request');
          firebase.database().ref().child('users').child("i0GsAixz0dT4o5hDSwiRo7Ecwjj2").on("value", (snapshot) => {
            console.log('snapshot', snapshot.val());
          });
        }, 1000);
        
        this.isLogged = false;
      }
      this.cd.detectChanges();

    });
  }

  signin() {
    console.log('signin', this.email, this.password);
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
    this.showSignInDialog = false;
  }
  signup() {
    console.log('signup', this.email, this.password);
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
      console.log('user', user);
      const value = {
        difficulty: this.difficulty
      };
      firebase.database().ref().child('users').child(user.uid).set(value);
    }).catch((error) => {
      console.log('cannot create user', error);
    });
    this.showSignUpDialog = false;

  }

  signout() {
    console.log('signout');
    firebase.auth().signOut();
  }

  showDifficulty() {
    switch (this.difficulty) {
      case 0:
        return 'Easy';
      case 1:
        return 'Medium';
      case 2:
        return 'Hard';
    }
  }

  openSigninDialog() {
    console.log('openSigninDialog');
    this.showSignInDialog = true;
    console.log('this.showSignInDialog', this.showSignInDialog);
    this.cd.detectChanges();
  }

}
