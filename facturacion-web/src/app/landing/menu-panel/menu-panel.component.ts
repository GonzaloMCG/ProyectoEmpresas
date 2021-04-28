import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-menu-panel',
  templateUrl: 'menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})

export class MenuPanelComponent {
  public userName = "No Name";
  currentDate = new Date();
  constructor() { }
}

