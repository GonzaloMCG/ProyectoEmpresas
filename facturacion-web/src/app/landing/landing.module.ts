import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicingPageComponent } from './invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent,
    MenuPanelComponent,
    InvoicingPageComponent,
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    RouterModule,
    MatTableModule,
    FormsModule,
  ],
  providers: []
})
export class LandingModule { }
