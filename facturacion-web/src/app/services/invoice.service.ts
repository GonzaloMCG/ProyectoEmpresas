import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public $invoicesEmitted: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  async newInvoice(data: any) {
    const newInvoice = await this.http.post(`${environment.apiUrl}/invoices`, { ...data }).toPromise();
    const listInvoices = this.$invoicesEmitted.getValue();
    if (!!listInvoices) {
      listInvoices.push(newInvoice);
      this.$invoicesEmitted.next(listInvoices);
    } else {
      this.$invoicesEmitted.next([newInvoice]);
    }
  }

  async getAll(): Promise<any> {
    const invoices = await this.http.get(`${environment.apiUrl}/invoices`).toPromise()
      .catch(error => Promise.reject(error));
    if (!this.$invoicesEmitted.getValue()) {
      this.$invoicesEmitted.next(invoices);
    }
    return invoices;
  }

  //probar endpoint
  async getInvoicing(id: number): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/invoices/${id}`).toPromise()
      .catch(error => Promise.reject(error));
  }

  //probar endpoint
  async getClientInvocing(clientName: string): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/invoices?client=${clientName}`).toPromise()
      .catch(error => Promise.reject(error));
  }

  async getInvocingDetails(id: string): Promise<any> {
    return await this.http.get(`${environment.apiUrl}/invoices/detail/${id}`).toPromise()
      .catch(error => Promise.reject(error));
  }
}
