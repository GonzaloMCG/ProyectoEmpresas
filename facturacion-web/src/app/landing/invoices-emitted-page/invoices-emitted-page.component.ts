import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { DetailInvoicesModalComponent } from '../modals/details-invoices-modal/details-invoices-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';


@Component({
  selector: 'app-invoices-emitted-page',
  templateUrl: 'invoices-emitted-page.component.html',
  styleUrls: ['./invoices-emitted-page.component.scss']
})

export class InvoicesEmittedComponent implements AfterViewInit {
  public columnas: string[] = ['date', 'client', 'total', 'action'];
  public sourceData = new MatTableDataSource();
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  private subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private invoiceService: InvoiceService) {
  }

  async ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
    const invoicesEmitted = await this.invoiceService.getAll();
    this.sourceData.data = invoicesEmitted;
    this.subscription = this.invoiceService.$invoicesEmitted.subscribe(
      async invoicesEmitted => this.sourceData.data = invoicesEmitted);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

  async openModal(articulo: Article) {
    const invoiceWithProducts = await this.invoiceService.getInvocingDetails(articulo.id);
    this.dialog.open(DetailInvoicesModalComponent, {
      autoFocus: false,
      data: invoiceWithProducts
    });
  }
}
