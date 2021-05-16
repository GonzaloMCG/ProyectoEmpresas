import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-invoice-product-modal',
  templateUrl: 'edit-invoice-product-modal.component.html',
  styleUrls: ['./edit-invoice-product-modal.component.scss']
})

export class EditInvoiceProductModalComponent {

  public name = "Nombre del producto";
  public unitprice = 999;
  public count = 4;
  public price = 3996;

  constructor(public dialogRef: MatDialogRef<EditInvoiceProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
