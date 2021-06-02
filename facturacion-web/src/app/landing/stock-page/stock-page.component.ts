import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteItemModalComponent } from '../modals/delete-item-modal/delete-item-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { Article } from 'src/app/models/article.model';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { MessageService } from 'src/app/message-handler/message.service';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services//authentication.service';

@Component({
  selector: 'app-stock-page',
  templateUrl: 'stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})


export class StockComponent {

  nameAndDescFilter = new FormControl('');

  filterValues = {
    id: '',
    name: '',
    description: '',
    stock: '',
    costPrice: '',
    price: ''
  };

  columnas: string[] = ['name', 'description', 'stock', 'costPrice', 'price', 'action'];
  sourceData = new MatTableDataSource();
  public allProduct: Article[];
  public totalstock: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
  }
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {
    this.sourceData.data = [];
    this.sourceData.filterPredicate = this.createFilter();
  }

  async ngOnInit() {
    this.getAllProduct();
    if (this.isSuperAdmin()) {
      this.getTotalInWarehouse();
    }
    this.nameAndDescFilter.valueChanges
      .subscribe(
        nameAndDesc => {
          this.filterValues.name = nameAndDesc;
          this.filterValues.description = nameAndDesc;
          this.sourceData.filter = JSON.stringify(this.filterValues);
          if (this.sourceData.paginator) {
            this.sourceData.paginator.firstPage();
          }
        }
      )
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
        if (this.isSuperAdmin()) {
          this.getTotalInWarehouse();
        }
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
      this.getAllProduct();
      if (this.isSuperAdmin()) {
        this.getTotalInWarehouse();
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
        if (this.isSuperAdmin()) {
          this.getTotalInWarehouse();
        }
      }
    });
  }

  async getAllProduct() {
    try {
      this.allProduct = (await this.productService.getAllProducts()).map(product => new Article(product));
      this.sourceData.data = this.allProduct;
    } catch (error) {
      this.messageService.showError(error, 4000);
    }
  }

  getTotalInWarehouse() {
    this.productService.getTotalInWarehouse().subscribe(
      response => {
        this.totalstock = response.totalInWarehouse.toFixed(2);
      },
      error => {
        this.messageService.showError(error, 4000);
      }
    );
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        || data.description.toLowerCase().indexOf(searchTerms.description.toLowerCase()) !== -1
    }
    return filterFunction;
  }

  isSuperAdmin() {
    return this.authenticationService.currentUserValue.roles.includes('SuperAdmin');
  }
}
