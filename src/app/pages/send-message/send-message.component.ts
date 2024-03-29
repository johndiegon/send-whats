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
    router: Router
  ) 
  {
    this.router = router;
  }

  listContactList: ContactListType[];
  fileIsProcessing:boolean;
  client: ClientStoreType;
  showModal: boolean;
  
  whatsSession: {
    session: string,
    qrCode: string,
    connected: boolean
  } = {
      qrCode: '',
      connected: false,
      session: undefined
    };

  // msgForm = this.fb.group({
  //   listSend: ['', Validators.required],
  //   numberWhatsApp: ['', Validators.required],
  //   msgTemplate: [''],
  //   inputListMsg: ['', Validators.required],
  //   image: ['']
  // })

  ngOnInit() {

    this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.fileIsProcessing = res.resume.fileIsProcessing;
        this.listContactList = res.resume.contactLists;
      });

    this.store.select(selectClient).subscribe(client => {
      this.client = client;
    });

  }

  // tryGetSessionWhatsapp() {
  //   this.msgForm.controls.numberWhatsApp.valueChanges.subscribe(value => {
  //     this.sessionWhatsappService.get(value)
  //       .pipe(catchError(error => {
  //         this.toastr.error(`Problema ao recuperar a sessão do WhatsApp, por favor contacte o suporte!`);
  //         return throwError(() => new Error(error.message));
  //       }))
  //       .subscribe(res => {
  //         console.log('GET session', res);
  //         if (res.sessionWhtas?.session) {
  //           this.whatsSession.connected = true;
  //           this.whatsSession.session =  res.sessionWhtas.session;
  //         }
  //       });
  //   });
  // }

 

  // get inputListMsg() {
  //   return this.msgForm.get('inputListMsg');
  // }

  // // openModal(item:ContactListType) {

  // //   if(item.orign && item.orign == 'order'){
  // //     this.showParamOrder = true;
  // //   }
    
  // //   this.showModal = true;
  // //   this.idSelected = item.id;
  // // }

  // onSubmitForm() {
  //   const { listSend, numberWhatsApp, msg } = this.msgForm.value;

  //   this.messageService.send({ message: msg, phone: numberWhatsApp, idList: listSend, picture: '' })
  //     .pipe(catchError(error => {
  //       this.toastr.error(`Não foi possivel enviar a mensagem: ${error.error.message}`)
  //       return throwError(() => new Error(error.message));
  //     }))
  //     .subscribe(_ => {

  //       this.toastr.success(`Mensagem enviada com sucesso`);

  //       this.msgForm.reset({
  //         listSend: '',
  //         numberWhatsApp: '',
  //         msgTemplate: '',
  //         msg: '',
  //         image: ''
  //       })
  //     });
  // }

  getCountDays(dateOrder){
    debugger
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
      this.router.navigateByUrl('/send', {
      state: { item: item }
      })
  }

}
