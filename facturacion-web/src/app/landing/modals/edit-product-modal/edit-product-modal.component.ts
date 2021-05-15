import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-product-modal',
  templateUrl: 'edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})

export class EditProductModalComponent {

  public name = "Nombre del producto";
  public description = "Descripción del Producto";
  public stock = "999";
  public price = "125.99";

  constructor(public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
