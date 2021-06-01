import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { DetailInvoicesModalComponent } from '../modals/details-invoices-modal/details-invoices-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Article } from 'src/app/models/article.model';
import { MessageService } from 'src/app/message-handler/message.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-invoices-emitted-page',
  templateUrl: 'invoices-emitted-page.component.html',
  styleUrls: ['./invoices-emitted-page.component.scss']
})

export class InvoicesEmittedComponent implements AfterViewInit {

  dateAndClientFilter = new FormControl('');

  filterValues = {
    createdAt: '',
    client: '',
    total: '',
  };

  public columnas: string[] = ['createdAt', 'client', 'total', 'action'];
  public sourceData = new MatTableDataSource();
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private messageService: MessageService,
    private datePipe: DatePipe) {
    this.sourceData.filterPredicate = this.createFilter();
  }

  async ngAfterViewInit() {
    this.sourceData.paginator = this.paginator;
    this.sourceData.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "Ítems por Página";
    try {
      const invoicesEmitted = await this.invoiceService.getAll();
      this.sourceData.data = invoicesEmitted;
    }
    catch (error) {
      this.messageService.showError(error, 4000);
    }
  }

  async ngOnInit() {
    this.dateAndClientFilter.valueChanges
      .subscribe(
        dateAndClient => {
          this.filterValues.createdAt = dateAndClient;
          this.filterValues.client = dateAndClient;
          this.sourceData.filter = JSON.stringify(this.filterValues);
          if (this.sourceData.paginator) {
            this.sourceData.paginator.firstPage();
          }
        }
      )
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

  createFilter(): (data: any, filter: string) => boolean {
    let datePipe = this.datePipe;
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return datePipe.transform(data.createdAt, 'dd/MM/YYYY').toLowerCase().indexOf(searchTerms.createdAt) !== -1
        || data.client.toLowerCase().indexOf(searchTerms.client.toLowerCase()) !== -1
    }
    return filterFunction;
  }
}
