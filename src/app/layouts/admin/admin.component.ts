import { Component, OnInit } from '@angular/core';
import { menus } from './menus';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  menus = menus;
  sidebarVisible: boolean = true;
  pageTitle: any;
  user!: User;
  photoURL: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.getUser();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        const nameFound = this.menus.find((value) => currentRoute.includes(value.path));
        this.pageTitle = nameFound ?? '';
      }
    });
  }

  ngOnInit(): void {}

  getUser() {
    this.authService.getUser$().subscribe((resp) => {
      this.user = resp!;
      this.photoURL = this.user.photoURL!;
    });
  }

  logout() {
    this.authService.logOut();
  }
}
