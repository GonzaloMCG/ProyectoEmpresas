import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';


@NgModule({
  declarations: [
    LandingComponent,
    MenuPanelComponent
  ],
  exports: [
    LandingComponent
  ],
  imports: [RouterModule],
  providers: []
})
export class LandingModule { }
