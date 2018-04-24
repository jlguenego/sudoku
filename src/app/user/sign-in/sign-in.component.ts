import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  signin() {
    console.log('signin', this.email, this.password);
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
