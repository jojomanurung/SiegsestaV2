import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { LoginComponent } from './views/login/login.component';
import { canActivateAdmin } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    loadChildren: () =>
      import('./views/admin/module/admin.module').then((m) => m.AdminModule),
    canActivate: [canActivateAdmin]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
