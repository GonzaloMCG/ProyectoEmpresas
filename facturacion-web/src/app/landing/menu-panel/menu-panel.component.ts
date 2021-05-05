import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu-panel',
  templateUrl: 'menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})

export class MenuPanelComponent {
  public userName = "No Name";
  currentDate = new Date();

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
