import { Component, OnInit } from '@angular/core';
import { menus } from './menus';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  menus = menus;
  sidebarVisible: boolean = true;
  pageTitle: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        console.log(event);
        const nameFound = this.menus.find((value) => currentRoute.includes(value.path));
        this.pageTitle = nameFound ?? '';
      }
    });
  }

  ngOnInit(): void {}
}
