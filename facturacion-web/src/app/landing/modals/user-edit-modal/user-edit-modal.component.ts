import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-edit-modal',
  templateUrl: 'user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})

export class UserEditModalComponent {

  public user = "Usuario X";
  public rol = "Administrador";
  public password = 999999;

  constructor(public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
