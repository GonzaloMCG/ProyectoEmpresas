import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicingPageComponent } from './invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ExampleModalComponent } from './invoicing-page/example-modal/example-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoicesEmittedComponent } from './invoices-emitted-page/invoices-emitted-page.component';

@NgModule({
  declarations: [
    LandingComponent,
    MenuPanelComponent,
    InvoicingPageComponent,
    ExampleModalComponent
    InvoicesEmittedComponent,
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    RouterModule,
    MatTableModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    ExampleModalComponent
  ],
  providers: []
})
export class LandingModule { }
