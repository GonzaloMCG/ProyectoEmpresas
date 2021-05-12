import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-item-modal',
  templateUrl: 'delete-item-modal.component.html',
  styleUrls: ['./delete-item-modal.component.scss']
})

export class DeleteItemModalComponent {
  public bodyText: string;

  constructor(public dialogRef: MatDialogRef<DeleteItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.bodyText = this.data.isUser ? '¿Desea eliminar el Usuario?' : '¿Desea eliminar el Producto?';
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}
