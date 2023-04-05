import { Menu } from "src/app/models/menu.model";

export const menus: Menu[] = [
  {
    name: 'Dashboard',
    icon: 'pi-home',
    path: 'dashboard',
    type: 'Link',
    display: true
  },
  {
    name: 'Registrasi',
    icon: 'pi-inbox',
    path: 'registrasi',
    type: 'Link',
    display: true
  },
  {
    name: 'Profil',
    icon: 'pi-user',
    path: 'profil',
    type: 'Link',
    display: false
  },
  {
    name: 'Report',
    icon: 'pi-chart-line',
    path: 'report',
    type: 'Link',
    display: true,
  },
]