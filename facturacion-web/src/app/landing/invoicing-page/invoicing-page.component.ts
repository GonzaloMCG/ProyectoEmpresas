import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invoicing-page',
  templateUrl: 'invoicing-page.component.html',
  styleUrls: ['./invoicing-page.component.scss']
})

export class InvoicingPageComponent {
  public cost = 0;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'unitPrice', 'quantity', 'price', 'action'];
  public data = [
    { name: 'SERVILLETAS FLORIPEL 3rollos 120 toallas funda de 10pts', unitPrice: 100, quantity: 1, price: '100', },
    { name: 'Jabón lavarropas líquido 2lts funda de 8 botellas ', unitPrice: 22, quantity: 2, price: '180' },
    { name: 'Limpiador perfumado 5lts funda de 4 bidones ', unitPrice: 200, quantity: 4, price: '999' },
    { name: 'Escoba c/protector de plástico caja 12 un ', unitPrice: 123, quantity: 30, price: '1243' },
    { name: 'Salsa de tomate (tradicional y pizza) caja 24un ', unitPrice: 999, quantity: 120, price: '32456' },

  ];

  constructor() {
    this.dataSource.data = this.data;
  }

  //Borrar una fila de la tabla
  delete(elm: unknown) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== elm)
  }

  //Agregar una fila a la tabla

  //Calcular total

  //Limpiar formulario (Cancelar)

  //Emitir formulario

}
