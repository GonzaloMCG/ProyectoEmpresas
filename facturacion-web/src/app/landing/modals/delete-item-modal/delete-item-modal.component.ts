import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from '../../../message-handler/message.service';


@Component({
  selector: 'app-delete-item-modal',
  templateUrl: 'delete-item-modal.component.html',
  styleUrls: ['./delete-item-modal.component.scss']
})

export class DeleteItemModalComponent {
  public bodyText: string;
  public message: string

  constructor(public dialogRef: MatDialogRef<DeleteItemModalComponent>,
    private productService: ProductService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.bodyText = this.data.isUser ? '¿Desea eliminar el Usuario?' : '¿Desea eliminar el Producto?';
  }

  close() {
    this.dialogRef.close();
  }

  submit() {

    if (this.data.isUser) {
      this.removeUser();
    }
    else {
      this.removeProduct();
    }
  }

  removeUser() {
    this.userService.deleteUser(this.data.username).subscribe(
      response => {
        this.messageService.showSuccess(response.message, 3000);
        this.dialogRef.close(true);
      },
      error => {
        this.messageService.showError(error, 30333);
        this.dialogRef.close(true);
      }
    );
  }

  async removeProduct() {
    try {
      await this.productService.removeProduct(this.data.product.id);
      this.messageService.showSuccess('El producto fue borrado correctamente.', 3000);
      this.dialogRef.close(this.data.product.id);
    } catch (error) {
      this.messageService.showError(error, 30333);
      this.dialogRef.close();
    }
  }
}
