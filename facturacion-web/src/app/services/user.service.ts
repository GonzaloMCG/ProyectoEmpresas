import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $usersSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  async loginUser(data: any) {
    this.http.post<any>(`${environment.apiUrl}/users/login`, { data });
  }

  //Probar endpiont
  async newUser(user: any) {
    const headers = this.authenticationService.getHeaders();
    const newUser = await this.http.post(`${environment.apiUrl}/users/register`, { user }, { headers }).toPromise();
    if (!!this.$usersSubject.getValue()) {
      const userList = this.$usersSubject.getValue();
      userList.push(newUser);
      this.$usersSubject.next(userList);
    } else {
      this.$usersSubject.next([newUser]);
    }
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/register`, { ...data });
  }

  deleteUser(data: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${data}`,);
  }

  manageRoles(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/manage-roles`, { ...data });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/reset-password`, { ...data });
  }
}
