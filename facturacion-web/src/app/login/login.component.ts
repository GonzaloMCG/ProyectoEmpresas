import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loading = false;
  public users: User[];
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {
  }

  submitData() {
    this.messageService.showError('hola error');
    const userData = {
      user: this.loginForm.get('userName').value,
      password: this.loginForm.get('userPassword').value,
    }
    try {
      this.userService.loginUser(userData);
    } catch (error) {
      this.messageService.showError(error);
    }

  }
}
