import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(data: any) {
    console.log(data);
  }

  getAllTest() {
    return this.http.get(`${environment.apiUrl}/products`);
  }
}
