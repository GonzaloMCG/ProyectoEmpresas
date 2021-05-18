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

  submit() {
    const formData = {
      ...this.addUserForm.value
    }
    var usuario = {
      username: formData.username,
      password: formData.password,
      roles: (formData.roles == 'Admin') ? ['Admin', 'User'] : ['User']
    }
    this.userService.registerUser(usuario).subscribe(
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
