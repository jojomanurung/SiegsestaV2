import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Pendaftaran } from 'src/app/models/pendaftaran.model';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
  searchCtrl: FormControl<string | null> = new FormControl<string | null>('');
  subs: Subscription = new Subscription();
  data!: Pendaftaran;
  loading: boolean = false;

  constructor(
    private regService: RegistrationService,
    private toast: MessageService
  ) {}

  searchData() {
    const barcode = this.searchCtrl.value;
    if (barcode) {
      this.loading = true;
      this.subs = this.regService.getPendaftaran(barcode).subscribe({
        next: (resp) => {
          console.log(resp);
          this.data = resp;
          this.loading = false;
        },
        error: (error) => {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          })
          this.loading = false;
        },
      });
    } else {
      return;
    }
  }

  register() {
    const barcode = this.searchCtrl.value;
    this.subs = this.regService.updateStatusRegister(barcode!).subscribe(() => {
      this.toast.add({
        severity: 'success',
        summary: 'Berhasil',
        detail: 'Berhasil Registrasi',
      });
      this.searchData();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
