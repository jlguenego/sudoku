import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isLogged = false;
  showSignInDialog = false;

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('login');
    this.showSignInDialog = true;
  }

}
