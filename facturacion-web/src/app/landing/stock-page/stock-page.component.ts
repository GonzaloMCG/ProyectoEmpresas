import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { DeleteItemModalComponent } from '../modals/delete-item-modal/delete-item-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-stock-page',
  templateUrl: 'stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})


export class StockComponent {

  columnas: string[] = ['name', 'description', 'stock', 'price', 'action'];
  sourceData = new MatTableDataSource();

  falsedatos: Articulo[] = [new Articulo('Producto 0', 'Descripción 0', 0, 0),
  new Articulo('Producto 1', 'Descripción 1', 1, 1300),
  new Articulo('Producto 2', 'Descripción 2', 13, 1200),
  new Articulo('Producto 3', 'Descripción 3', 99, 132),
  new Articulo('Producto 4', 'Descripción 4', 1500, 456),
  new Articulo('Producto 5', 'Descripción 5', 1300, 99),
  new Articulo('Producto 6', 'Descripción 6', 500, 43),
  new Articulo('Producto 7', 'Descripción 7', 200, 1300),
  new Articulo('Producto 8', 'Descripción 8', 100, 340),
  new Articulo('Producto 9', 'Descripción 9', 150, 999),
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
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

  openModalEdit() {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  openModalDelete() {
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: false
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }
  openModalAdd() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      autoFocus: false,
      data: {
        isUser: true
      }
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
  constructor(public name: string, public description: string, public stock: number, public price: number) {
  }
}
