import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-details-invoices-modal',
  templateUrl: 'details-invoices-modal.component.html',
  styleUrls: ['./details-invoices-modal.component.scss']
})

export class DetailInvoicesModalComponent {

  columnas: string[] = ['name', 'unitPrice', 'quantity', 'price'];
  sourceData = new MatTableDataSource();
  public client = "Nombre de empresa X"
  public paymentMethod = "Efectivo";
  public currency = "Pesos";
  public total = "999";
  public date = "30/02/2021";

  falsedatos: Articulo[] = [new Articulo('SERVILLETAS FLORIPEL 3rollos 120 toallas funda de 10pts', 100, 1, 100),
  new Articulo('Jabón lavarropas líquido 2lts funda de 8 botellas ', 22, 2, 180),
  new Articulo('Limpiador perfumado 5lts funda de 4 bidones ', 200, 4, 999),
  new Articulo('Jabón lavarropas líquido 2lts funda de 8 botellas ', 22, 2, 180),
  new Articulo('Jabón lavarropas líquido 2lts funda de 8 botellas ', 22, 2, 180),
  new Articulo('Limpiador perfumado 5lts funda de 4 bidones ', 200, 4, 999),
  new Articulo('Jabón lavarropas líquido 2lts funda de 8 botellas ', 22, 2, 180),
  ];

  constructor(public dialogRef: MatDialogRef<DetailInvoicesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sourceData.data = this.falsedatos;

  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(true);
  }
}

export class Articulo {
  constructor(public name: string, public unitPrice: number, public quantity: number, public price: number) {
  }
}
