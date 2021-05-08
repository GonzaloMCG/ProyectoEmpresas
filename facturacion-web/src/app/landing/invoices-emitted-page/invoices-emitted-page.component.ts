import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { DetailInvoicesModalComponent } from '../modals/details-invoices-modal/details-invoices-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-invoices-emitted-page',
  templateUrl: 'invoices-emitted-page.component.html',
  styleUrls: ['./invoices-emitted-page.component.scss']
})

export class InvoicesEmittedComponent implements AfterViewInit {

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
  }
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sourceData.filter = filterValue.trim().toLowerCase();

    if (this.sourceData.paginator) {
      this.sourceData.paginator.firstPage();
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
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
