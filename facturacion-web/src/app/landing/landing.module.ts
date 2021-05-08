import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicingPageComponent } from './invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoicesEmittedComponent } from './invoices-emitted-page/invoices-emitted-page.component';
import { DetailInvoicesModalComponent } from './modals/details-invoices-modal/details-invoices-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LandingComponent,
    MenuPanelComponent,
    InvoicingPageComponent,
    DetailInvoicesModalComponent,
    InvoicesEmittedComponent,
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    RouterModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  entryComponents: [
    DetailInvoicesModalComponent
  ],
  providers: []
})
export class LandingModule { }
