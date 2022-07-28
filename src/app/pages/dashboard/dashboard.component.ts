import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType } from 'src/app/models/ContactListType';
import { Answers, DashboardResType, ReportSendEntity, ReportTemplate, Senders } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { ContactListService } from 'src/app/services/contact-list.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Store } from '@ngrx/store';
import { ReportService } from 'src/app/services/report.service';
import { ReportMessages } from 'src/app/models/ReportMessages';

@Component({
  selector: 'dsw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private contactListService: ContactListService,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    private reportService: ReportService,
    private store: Store
    
  ) { }

  fileIsProcessing:boolean;
  client: ClientStoreType;
  reportTemplates:ReportTemplate[];
  historySenders: ReportSendEntity[]
  reportData: ReponseWrapper<ReportMessages>;
  listContactList: ContactListType[];
  countSendMessage:number;
  countReceiverAnswer:number;
  countSendMessageThisMonth:number;
  countReceiverAnswerThisMonth:number;

  ngOnInit() {

    
    this.dashboardService.get()
      .pipe(catchError(error => {
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.historySenders = res.dataDashboard.historySenders;
        this.reportTemplates = res.dataDashboard.reportTemplates;   
        this.countSendMessage = res.dataDashboard.countSendMessage;
        this.countReceiverAnswer = res.dataDashboard.countReceiverAnswer;
        this.countSendMessageThisMonth = res.dataDashboard.countSendMessageThisMonth;
        this.countReceiverAnswerThisMonth = res.dataDashboard.countReceiverAnswerThisMonth;
      });
      
       

      this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.fileIsProcessing = res.resume.fileIsProcessing;
        this.listContactList = res.resume.contactLists;
      });

      this.reportService.get()
          .pipe(catchError(error => {
            return throwError(() => new Error(error.message));
          }))
          .subscribe(res => {
            console.log(res);
          });


    // this.store.select(selectClient).subscribe(client => {
    //   this.client = client;
    // });
  }
}
