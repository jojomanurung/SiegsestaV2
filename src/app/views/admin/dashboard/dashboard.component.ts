import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  pendaftaran: number = 0;
  registered: number = 0;
  kelas: number = 0;
  users: number = 0;
  sort = [{ name: 'timestamp', state: 'desc' }];
  tablePendaftaran: Observable<any> = this.regService.getAllPendaftaran(
    this.sort,
    5
  );

  constructor(private regService: RegistrationService) {}

  ngOnInit(): void {
    this.getTable();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getStats() {
    const statsObv = {
      pendaftaran: this.regService.getCountPendaftaran(),
      registered: this.regService.getCountRegistered(),
      kelas: this.regService.getCountKelas(),
      users: this.regService.getCountUser(),
    };
    this.subs = forkJoin(statsObv).subscribe(
      ({ pendaftaran, registered, kelas, users }) => {
        this.pendaftaran = pendaftaran.data().count;
        this.registered = registered.data().count;
        this.kelas = kelas.data().count;
        this.users = users.data().count;
      }
    );
  }

  getTable() {
    this.subs = this.tablePendaftaran.subscribe((resp) => {
      if (resp) {
        this.getStats();
      }
    });
  }
}
