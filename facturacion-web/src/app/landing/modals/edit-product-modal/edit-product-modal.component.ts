import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/message-handler/message.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: 'edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})

export class EditProductModalComponent {

  public submitted = false;
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
    private messageService: MessageService,
  ) {
    this.initForm();
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    this.submitted = true;
    if (this.editProductForm.invalid) {
      this.messageService.showError('Todos los campos son obligatorios.', 3000);
      console.log("entre");
      return;
    }

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
    this.editProductForm.controls.name.setValue(this.data.product.name);
    this.editProductForm.controls.description.setValue(this.data.product.description);
    this.editProductForm.controls.stock.setValue(this.data.product.stock);
    this.editProductForm.controls.price.setValue(this.data.product.price);
  }
}
