import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo, ROUTES_MENU, ROUTES_MENU_SECUNDARY } from 'src/app/variables/Routes-menu';


@Component({
  selector: 'dsw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: RouteInfo[];
  public isCollapsed = true;
  menuItemsSecundary: RouteInfo[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES_MENU.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.menuItemsSecundary = ROUTES_MENU_SECUNDARY.filter(menuItem => menuItem);
  }
}
