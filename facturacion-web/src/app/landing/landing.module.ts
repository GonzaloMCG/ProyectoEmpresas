import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicingPageComponent } from './invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { CdkTableModule } from '@angular/cdk/table';


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
    CdkTableModule
  ],
  providers: []
})
export class LandingModule { }
