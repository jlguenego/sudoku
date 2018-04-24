import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  isLogged = false;
  showSignInDialog = false;

  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('login');
    
  }

}
