import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DashboardResType } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'dsw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  dataDash: ReponseWrapper<DashboardResType>;
  get totalInatives() {
    return this.dataDash?.dataDashboard?.inactiveCustomers30Days
    + this.dataDash?.dataDashboard?.inactiveCustomers60Days
    + this.dataDash?.dataDashboard?.inactiveCustomers90Days
  }

  ngOnInit() {

    this.dashboardService.get()
      .pipe(catchError(error => {
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.dataDash = res;
      });
  }



}
