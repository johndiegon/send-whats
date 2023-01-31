import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { ImportOrdersComponent } from '../../pages/import-orders/import-orders.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { SendMessageComponent } from 'src/app/pages/send-message/send-message.component';
import { ClientStatusChartComponent } from 'src/app/pages/dashboard/client-status-chart/client-status-chart.component';
import { OrdersDayNightChartComponent } from 'src/app/pages/dashboard/orders-day-night-chart/orders-day-night-chart.component';
import { OrdersWeekChartComponent } from 'src/app/pages/dashboard/orders-week-chart/orders-week-chart.component';
import { ModalImportComponent } from 'src/app/pages/import-orders/modal-import/modal-import.component';
import { CalendarMessageComponent } from 'src/app/pages/calendar-message/calendar-message.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { TaskMenssageComponent } from 'src/app/pages/calendar-message/task-message/task-message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    SharedModule,
    FullCalendarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    ImportOrdersComponent,
    ModalImportComponent,
    SendMessageComponent,
    ClientStatusChartComponent,
    OrdersDayNightChartComponent,
    OrdersWeekChartComponent,
    CalendarMessageComponent,
    TaskMenssageComponent
  ]
})

export class AdminLayoutModule {}
