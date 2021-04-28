import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = this.formBuilder.group({
    userName: [''],
    userPassword: [''],
  });

  constructor(private formBuilder: FormBuilder) { }

  submitData() {
    console.log('user name: ' + this.loginForm.get('userName').value);
    console.log('user password: ' + this.loginForm.get('userPassword').value);
  }
}
