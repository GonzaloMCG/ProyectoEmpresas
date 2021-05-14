import { Component, ViewChild  } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu-panel',
  templateUrl: 'menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})

export class MenuPanelComponent {
  public userName = "No Name";
  currentDate = new Date();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private authenticationService: AuthenticationService, private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
