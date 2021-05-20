import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-print-invoice-modal',
  templateUrl: 'print-invoice-modal.component.html',
  styleUrls: ['./print-invoice-modal.component.scss']
})

export class PrintInvoiceModalComponent implements AfterViewInit {

  columnas: string[] = ['name', 'quantity', 'total'];
  sourceData = new MatTableDataSource();
  today = new Date().toLocaleString();

  constructor(public dialogRef: MatDialogRef<PrintInvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(): void {
    console.log(this.data);
    this.sourceData.data = this.data.printData.form.invoiceProducts;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
  }
}
