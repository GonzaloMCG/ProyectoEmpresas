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
import { DeleteItemModalComponent } from '../modals/delete-item-modal/delete-item-modal.component';
import { EditInvoiceProductModalComponent } from '../modals/edit-invoice-product-modal/edit-invoice-product-modal.component';

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
    private invoiceService: InvoiceService) {
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
    if (query && query.length >= 3) {
      this.filteredProducts = await this.productService.getFilteredProducts(query);
      console.log(this.filteredProducts);
    } else {
      this.articuloselect = { ...this.emptyArticle };
    }
  }

  updateUnitPrice(element: any) {
    this.articuloselect.price = element.price;
    this.articuloselect.quantity = 1;
    this.articuloselect.total = element.price;
    this.articuloselect.id = element.id;
  }

  openModalEdit() {
    const dialogRef = this.dialog.open(EditInvoiceProductModalComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        //si le diste cerrar con el aceptar, hacemos algo
      }
    });
  }

  openModalDelete(cod: number) {
    const data = this.sourceData.data;
    const dialogRef = this.dialog.open(DeleteItemModalComponent, {
      autoFocus: false,
      data: {
        isUser: false
      }
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        data.splice(cod, 1);
        this.sourceData.data = data;
        this.calcularTotal();;
      }
    });
  }

  add() {
    const data = this.sourceData.data;
    if (!!this.articuloselect.name && !!this.articuloselect.price
      && !!this.articuloselect.quantity && !!this.articuloselect.total) {
      data.push({ ...this.articuloselect });
      this.articuloselect = { ...this.emptyArticle };
      this.sourceData.data = data;
      this.calcularTotal();
    } else {
      this.messageService.showError('Complete todos los datos')
    }
  }

  calcularTotal() {
    let totalValue = 0;
    this.sourceData.data.map((elem: any) => totalValue += elem.total);
    console.log(totalValue.toFixed(2));
    this.total = totalValue.toFixed(2);
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
      await this.invoiceService.newInvoice(data);
      this.initForm();
      this.messageService.showSuccess('Factura emitida correctamente');
    } catch (error) {
      this.messageService.showError(error);
    }
    console.log(data);
  }

  updateQuantityPrice() {
    this.articuloselect.total = this.articuloselect.price * this.articuloselect.quantity;
    this.articuloselect.total = Number(this.articuloselect.total.toFixed(2));
  }

  private initForm() {
    this.sourceData.data = [];
    this.invoicingForm.controls.client.setValue('');
    this.invoicingForm.controls.currency.setValue('pesos');
    this.invoicingForm.controls.paymentMethod.setValue('efectivo');
    this.total = '';
    this.articuloselect = { ...this.emptyArticle };
  }
}
