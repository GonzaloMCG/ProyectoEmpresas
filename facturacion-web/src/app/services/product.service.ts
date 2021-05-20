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

  async getAllProducts(): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/products`).toPromise().catch(error => Promise.reject(error));
  }

  async getFilteredProducts(query: string): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/products?name=${query}`).toPromise().catch(error => Promise.reject(error));
  }

  newProduct(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/products`, { ...data });
  }

  //probar endpoint
  async getProductById(id: number) {
    return await this.http.get(`${environment.apiUrl}/products/${id}`).toPromise();
  }

  //probar endpoint
  async getProductByName(name: string) {
    return await this.http.get(`${environment.apiUrl}/products?name=${name}`).toPromise();
  }

  async updateProduct(data: any) {
    const updatedProduct = await this.http.put(`${environment.apiUrl}/products/${data.id}`, { ...data }).toPromise();
    const productList = await this.getAllProducts();
    this.$productsSubject.next(productList);
  }

  async removeProduct(id: number) {
    await this.http.delete(`${environment.apiUrl}/products/${id}`).toPromise();
  }

  //probar endpoint
  async removeAllProduct() {
    await this.http.delete(`${environment.apiUrl}/products`).toPromise();
    this.$productsSubject.next(null);
  }

  //probar endpoint
  getTotalInWarehouse(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/money-in-warehouse`);
  }
}
