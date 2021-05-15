import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoicesEmittedComponent } from './invoices-emitted-page/invoices-emitted-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { DetailInvoicesModalComponent } from './modals/details-invoices-modal/details-invoices-modal.component';
import { AdminComponent } from './admin-page/admin-page.component';
import { StockComponent } from './stock-page/stock-page.component';
import { DeleteItemModalComponent } from './modals/delete-item-modal/delete-item-modal.component';
import { UserEditModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { InvoicingPageComponent } from './invoicing-page/invoicing-page.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './modals/edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [
    LandingComponent,
    MenuPanelComponent,
    InvoicingPageComponent,
    InvoicesEmittedComponent,
    AdminComponent,
    StockComponent,
    DetailInvoicesModalComponent,
    EditProductModalComponent,
    DeleteItemModalComponent,
    UserEditModalComponent,
    AddUserModalComponent,
    AddProductModalComponent,
    InvoicesEmittedComponent,
    AdminComponent,
    StockComponent
  ],
  exports: [
    LandingComponent
  ],
  imports: [
    RouterModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule
  ],
  entryComponents: [

  ],
  providers: []
})
export class LandingModule { }
