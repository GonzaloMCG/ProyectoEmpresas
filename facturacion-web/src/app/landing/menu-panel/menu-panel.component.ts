import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu-panel',
  templateUrl: 'menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})

export class MenuPanelComponent {
  public userName = "No Name";
  currentDate = new Date();

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logout();
  }
}
