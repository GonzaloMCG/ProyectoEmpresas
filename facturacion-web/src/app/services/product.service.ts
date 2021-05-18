import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public $productsSubject: BehaviorSubject<any[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAllProducts(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/products`).toPromise().catch(error => Promise.reject(error));
  }

  getFilteredProducts(query: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}/products?name=${query}`).toPromise().catch(error => Promise.reject(error));
  }

  newProduct(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/products`, { ...data });
  }

  //probar endpoint
  getProductById(id: number) {
    return this.http.get(`${environment.apiUrl}/products/${id}`).toPromise();
  }

  //probar endpoint
  getProductByName(name: string) {
    return this.http.get(`${environment.apiUrl}/products?name=${name}`).toPromise();
  }

  async updateProduct(data: any) {
    const updatedProduct = await this.http.put(`${environment.apiUrl}/products/${data.id}`, { ...data }).toPromise();
    const productList = await this.getAllProducts();
    this.$productsSubject.next(productList);
  }

  removeProduct(id: number) {
    this.http.delete(`${environment.apiUrl}/products/${id}`).toPromise();
    const productList = this.$productsSubject.getValue();
  }

  //probar endpoint
  removeAllProduct() {
    this.http.delete(`${environment.apiUrl}/products`).toPromise();
    this.$productsSubject.next(null);
  }
}
