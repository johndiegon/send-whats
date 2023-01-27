import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType } from 'src/app/models/ContactListType';
import { ReportTemplate } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { ContactListService } from 'src/app/services/contact-list.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Store } from '@ngrx/store';
import { ReportMessages } from 'src/app/models/ReportMessages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reportSelect: any;
  fileIsProcessing: boolean;
  client: ClientStoreType;
  reportTemplates: ReportTemplate[];
  reportData:  ReponseWrapper<ReportMessages>;
  listContactList:  ContactListType[];
  countSendMessage: number;
  countReceiverAnswer: number;
  countSendMessageThisMonth: number;
  countReceiverAnswerThisMonth: number;
  data: Date;

  constructor(
    private contactListService: ContactListService,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    private store: Store,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.data = new Date();


    this.dashboardService.get()
      .pipe(catchError(error => {
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
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
  }

  isOdd(num: number): Boolean {
    let i = 0;
    let odd = false;

    while (i !== num) {
      odd = !odd;
      i = i + 1;
    }
    return odd;
  }

  // openDetail(detail: any) {
  //   console.log(detail);
  // }

  open(content: any, detail: any) {
    this.reportSelect = detail;
    this.modalService.open(content, { windowClass : 'modal-md', ariaLabelledBy: 'modal-basic-title' });
  }

}
