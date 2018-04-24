import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [SignInComponent, DialogComponent],
  exports: [SignInComponent]
})
export class UserModule { }
