import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('authenticated', user);
      } else {
        console.log('not authenticated', user);
      }
    });
  }

  signin() {
    console.log('signin', this.email, this.password);
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
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
    this.isLogged = true;
  }
  signup() {
    console.log('signup', this.email, this.password);
    this.showSignUpDialog = false;
    this.isLogged = true;
  }

  signout() {
    console.log('signout');
    this.isLogged = false;
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

}
