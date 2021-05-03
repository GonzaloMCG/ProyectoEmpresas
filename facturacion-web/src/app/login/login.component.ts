import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
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
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/landing']);
    }
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // submitData() {
  //   const userData = {
  //     user: this.loginForm.get('userName').value,
  //     password: this.loginForm.get('userPassword').value,
  //   }
  //   this.userService.loginUser(userData);
  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.get('userName').value,
      this.loginForm.get('userPassword').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
