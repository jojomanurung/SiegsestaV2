import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { DateTime } from "luxon";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  dataSource = this.regService.getAllPendaftaran();
  public dateTime = DateTime;

  constructor(private regService: RegistrationService) {}

  ngOnInit(): void {
    this.getAllPendaftaran();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllPendaftaran() {
    this.subs = this.dataSource.subscribe((resp) => {
      console.log('data', resp);
    })
  }
}
