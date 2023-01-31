import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType, FilterWeekDays } from 'src/app/models/ContactListType';
import { selectClient } from 'src/app/redux/selectors.store';
import { ContactListService } from 'src/app/services/contact-list.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './send/send.component';

@Component({
  selector: 'dsw-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  router: Router;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactListService: ContactListService,
    private store: Store,
    router: Router,
    private modalService: NgbModal

  ) {
    this.router = router;
  }

  listContactList: ContactListType[];
  fileIsProcessing:boolean;
  client: ClientStoreType;
  showModal: boolean;
  loading = false;
  whatsSession: {
    session: string,
    qrCode: string,
    connected: boolean
  } = {
      qrCode: '',
      connected: false,
      session: undefined
    };

  ngOnInit() {
    this.loading = true;
    this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        this.loading = false;
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.fileIsProcessing = res.resume.fileIsProcessing;
        this.listContactList = res.resume.contactLists;
        this.loading = false;
      });

    this.store.select(selectClient).subscribe(client => {
      this.client = client;
    });

  }

  getCountDays(dateOrder){
    var today = new Date(Date.now());
    var order = new Date(dateOrder);
    var timeDiff = Math.abs(today.getTime() - order.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }

  getStringFilterDay(filterDays){
    switch(filterDays){
      case FilterWeekDays.JustDay:
        return "durante o dia.";
        break;
      case FilterWeekDays.JustNight:
        return "durante a noite.";
        break;
      case FilterWeekDays.JustWeeKend:
        return "de sexta a domingo.";
        break;
      case FilterWeekDays.JustWeek:
        return "de segunda a quinta.";
        break;
    }
  }

  closeModal() {
    this.showModal = false;

  }

  sendMessage(item:ContactListType){
      sessionStorage.setItem('MSG', JSON.stringify(item));
      this.modalService.open(SendComponent, { windowClass : 'modal-md', ariaLabelledBy: 'modal-basic-title' });
  }

}
