import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-invoice-product-modal',
  templateUrl: 'edit-invoice-product-modal.component.html',
  styleUrls: ['./edit-invoice-product-modal.component.scss']
})

export class EditInvoiceProductModalComponent {
  public productForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    total: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditInvoiceProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({ ...this.data, ...this.productForm.value });
  }

  private initForm() {
    Object.keys(this.productForm.controls).forEach(
      key => this.productForm.controls[key].setValue(this.data[key]));
  }
}
