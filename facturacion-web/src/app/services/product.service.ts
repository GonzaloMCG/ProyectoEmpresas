import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/products`).toPromise().catch(error => Promise.reject(error));
  }

  getFilteredProducts(query: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}/products?name=${query}`).toPromise().catch(error => Promise.reject(error));
  }
}
