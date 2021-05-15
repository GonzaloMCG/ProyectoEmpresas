import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: 'add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})

export class AddUserModalComponent {

  rolList: string[] = ["Administrador", "Operador", "Rol3", "Rol4"];

  constructor(public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
