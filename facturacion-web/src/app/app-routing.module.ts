import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './helpers/auth.guard';
import { InvoicesEmittedComponent } from './landing/invoices-emitted-page/invoices-emitted-page.component';
import { InvoicingPageComponent } from './landing/invoicing-page/invoicing-page.component';
import { LandingComponent } from './landing/landing.component';
import { MenuPanelComponent } from './landing/menu-panel/menu-panel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'landing', component: LandingComponent,
    children: [
      { path: '', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', component: InvoicingPageComponent, pathMatch: 'full' },
      { path: 'invoices-emitted-page', component: InvoicesEmittedComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
