import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { DeleteItemModalComponent } from "../modals/delete-item-modal/delete-item-modal.component";
import { UserEditModalComponent } from "../modals/edit-user-modal/edit-user-modal.component";
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model'


@Component({
  selector: 'app-admin-page',
  templateUrl: 'admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})


export class AdminComponent {

  user = "NombreDeUsuario";
  password: 12345678;

  columnas: string[] = ['username', 'roles', 'action'];
  sourceData = new MatTableDataSource();

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
  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.sourceData.data = [];
  }

  async ngOnInit() {
    this.getAllUsers();
  }

  openModalEdit() {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('aceptar');
        this.getAllUsers();
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  openModalDelete(user: any) {
    console.log(user);
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: true,
        username: user.username
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('aceptar');
        this.getAllUsers();
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
        this.getAllUsers();
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        this.sourceData.data = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
