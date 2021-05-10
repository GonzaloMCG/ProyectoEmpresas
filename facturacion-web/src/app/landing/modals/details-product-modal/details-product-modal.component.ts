import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-details-product-modal',
  templateUrl: 'details-product-modal.component.html',
  styleUrls: ['./details-product-modal.component.scss']
})

export class DetailProductModalComponent {

  public name = "Nombre del producto";
  public description = "Descripción del Producto";
  public stock = "999";
  public price = "125.99";

  constructor(public dialogRef: MatDialogRef<DetailProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
