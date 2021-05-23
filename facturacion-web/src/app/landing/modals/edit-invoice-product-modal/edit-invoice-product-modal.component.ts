import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-invoice-product-modal',
  templateUrl: 'edit-invoice-product-modal.component.html',
  styleUrls: ['./edit-invoice-product-modal.component.scss']
})

export class EditInvoiceProductModalComponent {

  public submitted = false;

  public productForm = this.formBuilder.group({
    name: [{ value: '', disabled: true }, Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^(([1-9]+[0-9]*\.?)|(0?\.))[0-9]?[0-9]?$/)]],
    quantity: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
    total: [{ value: '' }, [Validators.required, Validators.pattern(/^(([1-9]+[0-9]*\.?)|(0?\.))[0-9]?[0-9]?$/)]],
  });

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditInvoiceProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.productForm.get('total').disable();
  }

  submit() {

    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productForm.get('total').enable();

    this.dialogRef.close({ ...this.data, ...this.productForm.value });
  }

  negativeValuesControl(event) {
    if (event.target.value < 0) {
      this.productForm.get(event.target.id).setValue('');
      this.productForm.get('total').setValue('');
    } else {
      this.calcularTotal();
    }
  }

  private calcularTotal() {
    let total = this.productForm.controls.quantity.value * this.productForm.controls.price.value;
    this.productForm.get('total').setValue(Number(total.toFixed(2)));
  }

  private initForm() {
    Object.keys(this.productForm.controls).forEach(
      key => this.productForm.controls[key].setValue(this.data[key]));
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get quantity() { return this.productForm.get('quantity'); }
  get total() { return this.productForm.get('total'); }
}
