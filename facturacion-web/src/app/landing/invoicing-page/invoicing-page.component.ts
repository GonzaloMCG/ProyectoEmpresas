import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-invoicing-page',
  templateUrl: 'invoicing-page.component.html',
  styleUrls: ['./invoicing-page.component.scss']
})

export class InvoicingPageComponent {
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'quantity', 'price'];
  public data = [
    { name: 'SERVILLETAS FLORIPEL 3rollos 120 toallas funda de 10pts', quantity: 1, price: '100' },
    { name: 'Jabón lavarropas líquido 2lts funda de 8 botellas ', quantity: 2, price: '180' },
    { position: 3, name: 'Limpiador perfumado 5lts funda de 4 bidones ', quantity: 4, price: '999' },
    { position: 4, name: 'Escoba c/protector de plástico caja 12 un ', quantity: 30, price: '1243' },
    { position: 5, name: 'Salsa de tomate (tradicional y pizza) caja 24un ', quantity: 120, price: '32456' },
  ];

  constructor() {
    this.dataSource.data = this.data;
  }

}
