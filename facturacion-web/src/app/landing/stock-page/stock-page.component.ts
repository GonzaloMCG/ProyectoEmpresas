import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteItemModalComponent } from '../modals/delete-item-modal/delete-item-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-stock-page',
  templateUrl: 'stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})


export class StockComponent {

  columnas: string[] = ['name', 'description', 'stock', 'price', 'action'];
  sourceData = new MatTableDataSource();
  public allProduct: Article[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
  }
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sourceData.filter = filterValue.trim().toLowerCase();

    if (this.sourceData.paginator) {
      this.sourceData.paginator.firstPage();
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {
    this.sourceData.data = [];
  }

  async ngOnInit() {
    this.getAllProduct();
  }

  openModalEdit(product: Article) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      autoFocus: false,
      data: {
        product: product,
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllProduct();
      }
    });
  }

  openModalDelete(product: Article) {
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: false,
        product: product,
      }
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        this.getAllProduct();
      }
    });
  }

  openModalAdd() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      autoFocus: false,
      data: {
        isUser: true
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllProduct();
      }
    });
  }

  async getAllProduct() {
    try {
      this.allProduct = (await this.productService.getAllProducts()).map(product => new Article(product));
      this.sourceData.data = this.allProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
/*
export class Articulo {
  constructor(public name: string, public description: string, public stock: number, public price: number) {
  }
}*/

