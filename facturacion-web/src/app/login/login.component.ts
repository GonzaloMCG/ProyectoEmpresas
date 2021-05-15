import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { MessageService } from '../message-handler/message.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private router: Router) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/landing']);
    }
  }

  onSubmit() {
    try {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      this.authenticationService.login(this.loginForm.get('userName').value,
        this.loginForm.get('userPassword').value)
        .subscribe(
          data => {
            this.messageService.showSuccess('Ingresado correctamente', 3000);
            this.router.navigate(['/landing']);
          },
          error => {
            this.error = error;
            this.loading = false;
            this.messageService.showError(error, 30333);
          });
    } catch (error) { }
  }
}
