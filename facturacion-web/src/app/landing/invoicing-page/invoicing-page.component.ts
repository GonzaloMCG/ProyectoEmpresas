import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/article.model';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs/operators';

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
    paymentMethod: ['', Validators.required],
    currency: ['', Validators.required],
    total: ['', Validators.required]
  });

  public emptyArticle = {
    name: '',
    price: null,
    quantity: null,
    total: null
  };

  public productList: Article[] = [];

  public articuloselect = { ...this.emptyArticle };

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private productService: ProductService) {
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
    } else {
      this.articuloselect = { ...this.emptyArticle };
    }
  }

  updateUnitPrice(price: number) {
    this.articuloselect.price = price;
    this.articuloselect.quantity = 1;
    this.articuloselect.total = price;
  }

  borrarFila(cod: number) {
    const data = this.sourceData.data;
    if (confirm("Realmente quiere borrarlo?")) {
      data.splice(cod, 1);
    }
    this.sourceData.data = data;
    this.calcularTotal();
  }

  add() {
    const data = this.sourceData.data;
    const newArticle = new Article();
    newArticle['name'] = this.articuloselect.name;
    newArticle['price'] = this.articuloselect.price;
    newArticle['quantity'] = this.articuloselect.quantity;
    newArticle['total'] = this.articuloselect.total;

    if (newArticle.name && newArticle.price && newArticle.quantity & newArticle.total) {
      data.push(newArticle);
      this.articuloselect = { ...this.emptyArticle };
      this.sourceData.data = data;
      this.calcularTotal();
    }
  }

  calcularTotal() {
    let totalValue = 0;
    this.sourceData.data.map((elem: any) => totalValue += elem.total);
    console.log(totalValue.toFixed(2));
    this.total = totalValue.toFixed(2);
  }

  submit() {
    const buildProductList = this.sourceData.data;

    const data = {
      ...this.invoicingForm,
      invoiceProducts: buildProductList
    }
    console.log(data);
  }

  updateQuantityPrice() {
    this.articuloselect.total = this.articuloselect.price * this.articuloselect.quantity;
    this.articuloselect.total = Number(this.articuloselect.total.toFixed(2));
  }
}
