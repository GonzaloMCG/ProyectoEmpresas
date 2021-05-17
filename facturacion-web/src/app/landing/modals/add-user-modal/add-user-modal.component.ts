import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: 'add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})

export class AddUserModalComponent {

  rolList: string[] = ["Administrador", "Operador"];

  public addUserForm = this.formBuilder.group({
    username: ['', Validators.required],
    roles: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private formBuilder: FormBuilder,) {
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    const data = {
      ...this.addUserForm.value
    }
    var usuario = {
      username: data.username,
      password: data.password,
      roles: (data.roles == 'Admin') ? ['Admin', 'User'] : ['User']
    }
    await this.userService.registerUser(usuario).subscribe(
      response => {
        console.log(response);
        console.log('cierra');
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
        console.log('cierra');
        this.dialogRef.close(true);
      }
    );
  }
}
