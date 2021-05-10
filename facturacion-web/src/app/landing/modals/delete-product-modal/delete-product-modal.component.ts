import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-product-modal',
  templateUrl: 'delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})

export class DeleteProductModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
