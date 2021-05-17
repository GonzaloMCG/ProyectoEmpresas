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
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products`, { headers }).toPromise().catch(error => Promise.reject(error));
  }

  getAllProducts2(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`);
  }

  getFilteredProducts(query: string): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products?name=${query}`, { headers }).toPromise().catch(error => Promise.reject(error));
  }

  //probar endpoint
  newProduct(data: any) {
    const headers = this.authenticationService.getHeaders();
    return this.http.post(`${environment.apiUrl}/products`, { data }, { headers }).toPromise();
  }

  newProduct2(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/products`, { ...data });
  }

  //probar endpoint
  getProductById(id: number) {
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products/${id}`, { headers }).toPromise();
  }

  //probar endpoint
  getProductByName(name: string) {
    const headers = this.authenticationService.getHeaders();
    return this.http.get(`${environment.apiUrl}/products?name=${name}`, { headers }).toPromise();
  }

  //probar endpoint
  async updateProduct(data: any) {
    const headers = this.authenticationService.getHeaders();
    const updatedProduct = await this.http.put(`${environment.apiUrl}/products/${data.id}`, { data }, { headers }).toPromise();
    const productList = this.$productsSubject.getValue();
    if (!productList) {
      let filteredProductList = productList.filter(elem => elem.id !== data.id);
      filteredProductList.push(updatedProduct);
      this.$productsSubject.next(filteredProductList);
    }
  }

  //probar endpoint
  removeProduct(id: number) {
    const headers = this.authenticationService.getHeaders();
    this.http.delete(`${environment.apiUrl}/products/${id}`, { headers }).toPromise();
    const productList = this.$productsSubject.getValue();
    if (!productList) {
      const filteredProductList = productList.filter(elem => elem.id !== id);
      this.$productsSubject.next(filteredProductList);
    }
  }

  //probar endpoint
  removeAllProduct() {
    const headers = this.authenticationService.getHeaders();
    this.http.delete(`${environment.apiUrl}/products`, { headers }).toPromise();
    this.$productsSubject.next(null);
  }
}
