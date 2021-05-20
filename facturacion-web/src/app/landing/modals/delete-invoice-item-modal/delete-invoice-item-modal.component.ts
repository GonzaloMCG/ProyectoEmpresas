import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-invoice-item-modal',
  templateUrl: 'delete-invoice-item-modal.component.html',
  styleUrls: ['./delete-invoice-item-modal.component.scss']
})

export class DeleteInvoiceItemModalComponent {
  public bodyText: string;

  constructor(public dialogRef: MatDialogRef<DeleteInvoiceItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.bodyText = '¿Desea eliminar el producto de la factura?';
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.data.product);
  }
}
