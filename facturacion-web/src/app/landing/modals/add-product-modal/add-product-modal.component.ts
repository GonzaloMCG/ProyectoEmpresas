import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/message-handler/message.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: 'add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})

export class AddProductModalComponent {

  public submitted = false;
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    price: ['', Validators.required],
    costPrice: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,) {
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {

    this.submitted = true;
    if (this.addProductForm.invalid) {
      this.messageService.showError('Todos los campos son obligatorios.', 3000);
      return;
    }

    await this.productService.newProduct({ ...this.addProductForm.value }).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      error => {
        this.dialogRef.close(true);
      }
    );
  }
}
