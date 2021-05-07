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
  selector: 'app-invoices-emitted-page',
  templateUrl: 'invoices-emitted-page.component.html',
  styleUrls: ['./invoices-emitted-page.component.scss']
})

export class InvoicesEmittedComponent {

  columnas: string[] = ['date', 'client', 'total', 'action'];

  sourceData = new MatTableDataSource();

  falsedatos: Articulo[] = [new Articulo('10/02/2021', 'Probado Empresas', 12300),
  new Articulo('11/02/2021', 'Esta es una empresa', 1200),
  new Articulo('12/02/2021', 'Esta es otra empresa', 5430),
  new Articulo('11/02/2021', 'Empresa1', 1200),
  new Articulo('12/02/2021', 'Empresa2', 5430),
  new Articulo('11/02/2021', 'Empresa3', 1200),
  new Articulo('12/02/2021', 'Empresa4', 5430),
  new Articulo('11/02/2021', 'Antepenultima Empresa', 1200),
  new Articulo('12/02/2021', 'Penultima Empresa', 5430),
  new Articulo('11/02/2021', 'Ultima Empresa', 1200),
  ];

  articuloselect: Articulo = new Articulo("", "", 0);

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

}

export class Articulo {
  constructor(public date: string, public client: string, public total: number) {
  }
}
