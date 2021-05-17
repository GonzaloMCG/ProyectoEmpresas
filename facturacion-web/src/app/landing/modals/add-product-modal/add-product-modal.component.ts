import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product-modal',
  templateUrl: 'add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})

export class AddProductModalComponent {

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private formBuilder: FormBuilder,) {
  }

  close() {
    this.dialogRef.close();
  }

  async submit() {
    const data = {
      ...this.addProductForm.value
    }
    var product = {
      name: data.name,
      description: data.description,
      stock: data.stock,
      price: data.price,
    }
    await this.productService.newProduct2(product).subscribe(
      response => {
        console.log(response);
        console.log('cierra');
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
        console.log('cierra');
        this.dialogRef.close(true);
      }
    );
  }
}
