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
    // const user = await this.authenticationService.login(data.user, data.password);
    // console.log(user);
    // this.$usersSubject.next(user);
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
    //const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/users`);
  }

  registerUser(data: any): Observable<any> {
    console.log(data);
    const headers = this.authenticationService.getHeaders();
    return this.http.post(`${environment.apiUrl}/users/register`, {...data}, {headers});
  }
}
