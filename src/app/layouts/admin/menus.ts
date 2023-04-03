import { Menu } from "src/app/models/menu.model";

export const menus: Menu[] = [
  {
    name: 'Dashboard',
    icon: 'pi-home',
    path: 'dashboard',
    display: true
  },
  {
    name: 'Registrasi',
    icon: 'pi-inbox',
    path: 'registrasi',
    display: true
  },
  {
    name: 'Profil',
    icon: 'pi-user',
    path: 'profil',
    display: false
  },
]