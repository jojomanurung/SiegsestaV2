import { Component, OnInit } from '@angular/core';
import { menus } from './menus';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  menus = menus;
  sidebarVisible: boolean = true;
  pageTitle: any;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        const nameFound = this.menus.find((value) => currentRoute.includes(value.path));
        this.pageTitle = nameFound ?? '';
      }
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logOut();
  }
}
