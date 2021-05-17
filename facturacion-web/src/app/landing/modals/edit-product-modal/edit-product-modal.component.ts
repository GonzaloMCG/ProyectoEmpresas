import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: 'edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})

export class EditProductModalComponent {

  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    const data = {
      ...this.editProductForm.value
    }
    try {
      await this.productService.updateProduct({ ...this.data.product, ...data });
      this.dialogRef.close(true);
    }
    catch (error) {
      this.dialogRef.close();
    }
  }

  initForm() {

  }
}
