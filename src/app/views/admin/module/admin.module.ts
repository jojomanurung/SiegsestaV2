import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegistrationComponent } from '../registration/registration.component';

@NgModule({
  declarations: [DashboardComponent, RegistrationComponent, ProfileComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
