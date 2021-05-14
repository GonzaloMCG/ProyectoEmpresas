import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public $invoicesEmitted: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  async newInvoice(data: any) {
    const headers = this.authenticationService.getHeaders();
    const newInvoice = await this.http.post(`${environment.apiUrl}/invoices`, { data }, { headers });
    console.log(newInvoice);
    const listInvoices = this.$invoicesEmitted.getValue();
    if (!!listInvoices) {
      listInvoices.push(newInvoice);
      this.$invoicesEmitted.next(listInvoices);
    } else {
      this.$invoicesEmitted.next([newInvoice]);
    }
  }

  async getAll(): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    const invoices = await this.http.get(`${environment.apiUrl}/invoices`, { headers }).toPromise()
      .catch(error => Promise.reject(error));
    if (!this.$invoicesEmitted.getValue()) {
      this.$invoicesEmitted.next(invoices);
    }
    return invoices;
  }

  async getInvoicing(id: number): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return await this.http.get(`${environment.apiUrl}/invoices/${id}`, { headers }).toPromise()
      .catch(error => Promise.reject(error));
  }

  async getClientInvocing(clientName: string): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return await this.http.get(`${environment.apiUrl}/invoices?client=${clientName}`, { headers }).toPromise()
      .catch(error => Promise.reject(error));
  }

  async getInvocingDetails(id: string): Promise<any> {
    const headers = this.authenticationService.getHeaders();
    return await this.http.get(`${environment.apiUrl}/invoices/detail/${id}`, { headers }).toPromise()
      .catch(error => Promise.reject(error));
  }
}
