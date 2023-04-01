import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from '../detail/detail.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegistrationComponent } from '../registration/registration.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profil',
    component: ProfileComponent,
  },
  {
    path: 'registrasi',
    component: RegistrationComponent,
  },
  {
    path: 'registrasi/detail',
    component: DetailComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
