import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAllProducts(): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products`, { headers }).toPromise().then(response => console.log(response)).catch(error => Promise.reject(error));
  }

  getFilteredProducts(query: string): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products?name=${query}`, { headers }).toPromise().catch(error => Promise.reject(error));
  }
}
