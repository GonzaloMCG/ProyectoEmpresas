import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicingPageComponent } from './landing/invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing/landing.component';
import { MenuPanelComponent } from './landing/menu-panel/menu-panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing', component: LandingComponent,
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', component: InvoicingPageComponent, pathMatch: 'full' },
      { path: 'invoices-emitted-page', component: LandingComponent, pathMatch: 'full' },
      { path: 'stack-page', component: LandingComponent, pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
