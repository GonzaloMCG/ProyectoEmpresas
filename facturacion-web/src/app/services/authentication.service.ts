import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public $currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
    private router: Router) {
    this.$currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): User {
    return this.$currentUserSubject.getValue();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.$currentUserSubject.next(user);
        return user;
      }));
  }

  getHeaders() {
    const headers = {
      Authorization: `Bearer ${this.$currentUserSubject.getValue().token}`
    }
    return headers;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.$currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
