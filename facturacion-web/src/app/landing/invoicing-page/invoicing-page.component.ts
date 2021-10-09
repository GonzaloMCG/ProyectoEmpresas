import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/article.model';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { MessageService } from 'src/app/message-handler/message.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { EditInvoiceProductModalComponent } from '../modals/edit-invoice-product-modal/edit-invoice-product-modal.component';
import { DeleteInvoiceItemModalComponent } from '../modals/delete-invoice-item-modal/delete-invoice-item-modal.component';
import { PrintInvoiceModalComponent } from '../modals/print-invoice-modal/print-invoice-modal.component';

@Component({
  selector: 'app-invoicing-page',
  templateUrl: 'invoicing-page.component.html',
  styleUrls: ['./invoicing-page.component.scss']
})

export class InvoicingPageComponent implements OnInit {
  public total = '';
  public columnas: string[] = ['name', 'price', 'quantity', 'total', 'action'];
  public sourceData = new MatTableDataSource<Article>();
  public searchQuery$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public filteredProducts = []
  public submited: boolean = true;

  public invoicingForm = this.formBuilder.group({
    client: ['', Validators.required],
    paymentMethod: ['efectivo', Validators.required],
    currency: ['pesos', Validators.required],
  });

  public emptyArticle = {
    id: '',
    name: '',
    price: null,
    quantity: null,
    total: null
  };

  public productList: Article[] = [];

  public articuloselect = { ...this.emptyArticle };

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private invoiceService: InvoiceService,
  ) {
  }

  async ngOnInit() {
    const typeahead = this.searchQuery$.asObservable().pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    // just skipping null values because we want to detect the empty string
    typeahead.pipe(skipWhile(q => q === null)).subscribe(query => this.filterProducts(query));
  }

  async filterProducts(query: string) {
    if (query && query.length >= 2) {
      try {
        this.filteredProducts = await this.productService.getFilteredProducts(query);
      } catch (error) {
        this.messageService.showError(error, 4000);
      }
    } else {
      this.articuloselect = { ...this.emptyArticle };
    }
  }

  updateUnitPrice(element: any) {
    this.articuloselect.id = element.id;
    this.articuloselect.price = element.price;
    this.articuloselect.quantity = 1;
    this.articuloselect.total = element.price;
    this.filteredProducts = [];
  }

  openModalEdit(article: Article) {
    const dialogRef = this.dialog.open(EditInvoiceProductModalComponent, {
      autoFocus: false,
      data: article
    });

    dialogRef.afterClosed().subscribe(async updatedProduct => {
      if (updatedProduct) {
        let updateItem = this.sourceData.data.find(product => product.id === updatedProduct.id);
        let index = this.sourceData.data.indexOf(updateItem);
        this.sourceData.data[index] = { ...updatedProduct };
        this.sourceData.data = [...this.sourceData.data];
        this.calcularTotal();
      }
    });
  }

  modifyUnitPrice() {
    if (this.articuloselect.price >= 0) {
      this.updateQuantityPrice();
    } else {
      this.articuloselect.price = '';
      this.articuloselect.total = '';
    }
  }

  openModalDelete(product: any) {
    const dialogRef = this.dialog.open(DeleteInvoiceItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: false,
        product
      }
    })
    dialogRef.beforeClosed().subscribe((res) => {
      if (res) {
        let removeItem = this.sourceData.data.find(product => product.id === res.id);
        let index = this.sourceData.data.indexOf(removeItem);
        let listElements = this.sourceData.data.length;
        this.sourceData.data.splice(index, 1);
        listElements = this.sourceData.data.length;
        this.sourceData.data = listElements >= 1 ? this.sourceData.data = [...this.sourceData.data] : [];
        this.calcularTotal();
      }
    });
  }

  add() {
    const data = this.sourceData.data;
    if (!!this.articuloselect.name && !!this.articuloselect.price
      && !!this.articuloselect.quantity && !!this.articuloselect.total) {
      let articleExists: boolean = false;
      data.map(articles => {
        if (!articleExists && articles.id === this.articuloselect.id) {
          articleExists = true;
          if (articles.price === this.articuloselect.price) {
            articles.quantity += this.articuloselect.quantity;
            articles.total += this.articuloselect.total;
            articles.total = Number(articles.total.toFixed(2));
          }
          else {
            this.messageService.showError('El producto ya existe en la nota de pedido y el valor del precio unitario debe coincidir.', 4000);
          }
        }
      })
      if (!articleExists) {
        data.push({ ...this.articuloselect });
      }
      this.articuloselect = { ...this.emptyArticle };
      this.sourceData.data = data;
      this.calcularTotal();
    } else {
      this.messageService.showError('Complete todos los datos')
    }
  }

  calcularTotal() {
    let totalValue = 0;
    if (this.sourceData.data && this.sourceData.data.length) {
      this.sourceData.data.map((elem: any) => totalValue += elem.total);
    }
    this.total = Number(totalValue).toFixed(2);
  }

  async submitInvoice() {
    const buildProductList = this.sourceData.data;

    const data = {
      ...this.invoicingForm.value,
      invoiceProducts: buildProductList,
      total: this.total
    }
    if (!buildProductList || !buildProductList.length) {
      this.messageService.showError('La factura no contiene ningún producto');
      return;
    }

    try {
      if (this.submited) {
        this.submited = false;
        await this.invoiceService.newInvoice(data);
        this.initForm();
        this.messageService.showSuccess('Factura emitida correctamente');
        this.openModalAdd(data);
      }
    } catch (error) {
      this.messageService.showError(error);
    } finally {
      this.submited = true;
    }
  }

  updateQuantityPrice() {
    if (this.articuloselect.quantity > 0) {
      this.articuloselect.total = this.articuloselect.price * this.articuloselect.quantity;
      this.articuloselect.total = Number(this.articuloselect.total.toFixed(2));
    } else {
      this.articuloselect.quantity = '';
      this.articuloselect.total = '';
    }
  }

  private initForm() {
    this.sourceData.data = [];
    this.invoicingForm.controls.client.setValue('');
    this.invoicingForm.controls.currency.setValue('pesos');
    this.invoicingForm.controls.paymentMethod.setValue('efectivo');
    this.total = '';
    this.articuloselect = { ...this.emptyArticle };
  }

  async openModalAdd(invoicingForm: any) {
    const printData = {
      form: invoicingForm,
    }
    const dialogRef = this.dialog.open(PrintInvoiceModalComponent, {
      autoFocus: false,
      data: {
        printData,
      }
    });
  }

  cleanInvoice() {
    this.initForm();
  }
}
