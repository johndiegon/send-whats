import { Component, OnInit, ElementRef } from '@angular/core';
import { Location} from '@angular/common';
import { ROUTES_MENU } from 'src/app/variables/Routes-menu';

@Component({
  selector: 'dsw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  focus;
  listTitles: any[];

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.listTitles = ROUTES_MENU.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
