import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteItemModalComponent } from "../modals/delete-item-modal/delete-item-modal.component";
import { UserService } from 'src/app/services/user.service';
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { UserEditModalComponent } from "../modals/edit-user-modal/edit-user-modal.component";
import { User } from '../../models/user.model'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services//authentication.service';
import { MessageService } from '../../message-handler/message.service';
import { CustomValidators } from '../../validators/custom-validators';


@Component({
  selector: 'app-admin-page',
  templateUrl: 'admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})


export class AdminComponent {

  public submitted = false;

  public changePasswordForm = this.formBuilder.group({
    username: [{ value: '', disabled: true }, Validators.required],
    oldPassword: ['', Validators.required],
    password: ['', Validators.compose([
      Validators.required,
      // check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, {
        hasNumber: true
      }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      // check whether the entered password has a lower case letter
      CustomValidators.patternValidator(/[a-z]/, {
        hasSmallCase: true
      }),
      // check whether the entered password has a special character
      /*CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),*/
      Validators.minLength(8)
    ])],
    repeatPassword: ['', Validators.compose([Validators.required])],
  }, {
    validators: [CustomValidators.passwordMatchValidator]
  });

  columnas: string[] = ['username', 'roles', 'action'];
  sourceData = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.sourceData.paginator = this.paginator;
      this.sourceData.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
    }
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
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    this.sourceData.data = [];
  }

  async ngOnInit() {
    this.changePasswordForm.controls.username.setValue(this.authenticationService.currentUserValue.username);
    if (this.authenticationService.currentUserValue.roles.includes('Admin')) {
      this.getAllUsers();
    }
  }

  openModalEdit(user: any) {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      autoFocus: false,
      data: {
        user: user
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllUsers();
      }
    });
  }

  openModalDelete(user: any) {
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: true,
        username: user.username
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllUsers();
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
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        this.sourceData.data = response;
      },
      error => {
        this.messageService.showError(error, 4000);
      }
    );
  }

  submit() {

    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    const formData = {
      ...this.changePasswordForm.value
    }
    var passwords = {
      oldPassword: formData.oldPassword,
      password: formData.password,
    }
    this.userService.changePassword(passwords).subscribe(
      response => {
        this.messageService.showSuccess(response.message, 3000);
      },
      error => {
        this.messageService.showError(error, 3000);
      }
    );
  }

  isAdmin() {
    return this.authenticationService.currentUserValue.roles.includes('Admin');
  }


  get password() { return this.changePasswordForm.get('password'); }
  get repeatPassword() { return this.changePasswordForm.get('repeatPassword'); }
}
