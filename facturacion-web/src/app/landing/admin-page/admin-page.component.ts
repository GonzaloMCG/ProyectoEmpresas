import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { DeleteItemModalComponent } from "../modals/delete-item-modal/delete-item-modal.component";
import { UserEditModalComponent } from "../modals/edit-user-modal/edit-user-modal.component";


@Component({
  selector: 'app-admin-page',
  templateUrl: 'admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})


export class AdminComponent {

  user = "NombreDeUsuario";
  password: 12345678;

  columnas: string[] = ['user', 'rol', 'action'];
  sourceData = new MatTableDataSource();

  falsedatos: Articulo[] = [new Articulo('Usuario 0', 'Administrador'),
  new Articulo('Usuario 1', 'Operador'),
  new Articulo('Usuario 2', 'Administrador'),
  new Articulo('Usuario 3', 'Operador'),
  new Articulo('Usuario 4', 'Administrador'),
  new Articulo('Usuario 5', 'Operador'),
  new Articulo('Usuario 6', 'Administrador'),
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
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('aceptar');
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  openModalDelete() {
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
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

  openModalAdd() {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
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
  constructor(public user: string, public rol: string) {
  }
}
