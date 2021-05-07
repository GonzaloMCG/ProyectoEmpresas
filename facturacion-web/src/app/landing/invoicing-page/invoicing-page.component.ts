import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DetailInvoicesModalComponent } from '../modals/details-invoices-modal/details-invoices-modal.component';

@Component({
  selector: 'app-invoicing-page',
  templateUrl: 'invoicing-page.component.html',
  styleUrls: ['./invoicing-page.component.scss']
})

export class InvoicingPageComponent {

  total = 0;
  columnas: string[] = ['name', 'unitPrice', 'quantity', 'price', 'action'];

  sourceData = new MatTableDataSource();

  falsedatos: Articulo[] = [new Articulo('SERVILLETAS FLORIPEL 3rollos 120 toallas funda de 10pts', 100, 1, 100),
  new Articulo('Jabón lavarropas líquido 2lts funda de 8 botellas ', 22, 2, 180),
  new Articulo('Limpiador perfumado 5lts funda de 4 bidones ', 200, 4, 999),
  ];

  articuloselect: Articulo = new Articulo("", 0, 0, 0);

  constructor(public dialog: MatDialog) {
    this.sourceData.data = this.falsedatos;
  }

  openModal() {
    const dialogRef = this.dialog.open(DetailInvoicesModalComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('aceptar');
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  borrarFila(cod: number) {
    const data = this.sourceData.data;
    if (confirm("Realmente quiere borrarlo?")) {
      data.splice(cod, 1);
    }
    this.sourceData.data = data;
    this.calcularTotal();
  }

  agregar() {
    const data = this.sourceData.data;
    data.push((new Articulo(this.articuloselect.name, this.articuloselect.unitPrice, this.articuloselect.quantity, this.articuloselect.price)));
    this.sourceData.data = data;
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = 0;
    this.sourceData.data.map((elem: any) => this.total += elem.price);
  }
}

export class Articulo {
  constructor(public name: string, public unitPrice: number, public quantity: number, public price: number) {
  }

}
