import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: 'edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})

export class UserEditModalComponent {

  public editUserForm = this.formBuilder.group({
    username: [{ value: '', disabled: true }, Validators.required],
    roles: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.editUserForm.controls.username.setValue(this.data.user.username);
    //this.editUserForm.controls.roles.setValue(this.data.user.roles);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const formData = {
      ...this.editUserForm.value
    }
    var usuario = {
      password: formData.password,
      roles: (formData.roles == 'Admin') ? ['Admin', 'User'] : ['User']
    }
    this.userService.manageRoles({ username: this.data.user.username, roles: usuario.roles }).subscribe(
      response => {
        if (usuario.password) {
          this.userService.resetPassword({ username: this.data.user.username, password: usuario.password }).subscribe(
            response => {
              this.dialogRef.close(true);
            },
            error => {
              this.dialogRef.close(true);
            }
          );
        }
        else {
          this.dialogRef.close(true);
        }
      },
      error => {
        this.dialogRef.close(true);
      }
    );
  }
}
