import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DetailComponent } from '../detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DashboardComponent,
    RegistrationComponent,
    ProfileComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    SkeletonModule,
    ToastModule,
    TableModule
  ],
  providers: [MessageService],
})
export class AdminModule {}
