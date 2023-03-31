import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pendaftaran } from 'src/app/models/pendaftaran.model';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  id: string = '';
  data!: Pendaftaran;

  constructor(
    private router: Router,
    private regService: RegistrationService,
    private toast: MessageService
  ) {
    const route = this.router.getCurrentNavigation()?.extras?.state;
    if (route) {
      this.id = route['id'];
    } else {
      this.return();
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.subs = this.regService
        .getPendaftaran(this.id)
        .subscribe((data) => (this.data = data));
    }
  }

  register() {
    this.subs = this.regService.updateStatusRegister(this.id).subscribe(() => {
      this.toast.add({
        severity: 'success',
        summary: 'Berhasil',
        detail: 'Berhasil Registrasi',
      });
      setTimeout(() => this.return(), 3000);
    });
  }

  return() {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
