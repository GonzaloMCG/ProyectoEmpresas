import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-details-invoices-modal',
  templateUrl: 'details-invoices-modal.component.html',
  styleUrls: ['./details-invoices-modal.component.scss']
})

export class DetailInvoicesModalComponent implements AfterViewInit {
  columnas: string[] = ['name', 'quantity', 'total'];
  sourceData = new MatTableDataSource();

  constructor(public dialogRef: MatDialogRef<DetailInvoicesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(): void {
    this.sourceData.data = this.data.invoiceProducts;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
