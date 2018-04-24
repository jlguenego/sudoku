import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase/app';
require('firebase/auth');


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

  constructor(public cd: ChangeDetectorRef) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('authenticated', user);
        this.email = user.email;
        this.isLogged = true;
      } else {
        console.log('not authenticated', user);
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
