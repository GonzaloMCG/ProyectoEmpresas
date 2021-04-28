import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

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

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  submitData() {
    const userData = {
      user: this.loginForm.get('userName').value,
      password: this.loginForm.get('userPassword').value,
    }
    this.userService.loginUser(userData);
  }
}
