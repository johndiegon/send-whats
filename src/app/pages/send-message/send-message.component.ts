import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ClientStoreType } from 'src/app/models/ClientType';
import { ContactListType } from 'src/app/models/ContactListType';
import { MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';
import { ContactListService } from 'src/app/services/contact-list.service';
import { MessageService } from 'src/app/services/message.service';
import { io, Socket } from "socket.io-client";
import { SessionWhastAppType } from 'src/app/models/SessionWhastAppType';
import { SessionWhatsappService } from 'src/app/services/session-whatsapp.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dsw-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactListService: ContactListService,
    private messageService: MessageService,
    private sessionWhatsappService: SessionWhatsappService,
    private store: Store
  ) { }

  socket: Socket;
  listMsg: MessageType[] = [];
  listContactList: ContactListType[];
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

  msgForm = this.fb.group({
    listSend: ['', Validators.required],
    numberWhatsApp: ['', Validators.required],
    msgTemplate: [''],
    msg: ['', Validators.required],
    image: ['']
  })

  ngOnInit() {
    this.socket = io(`${environment.SOCKET_IO}`, {
      transports: ['websocket']
    });

    console.log('socket', this.socket);

    this.contactListService.getContactList()
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel encontrar a lista de contatos')
        return throwError(() => new Error(error.message));
      }))
      .subscribe(res => {
        this.listContactList = res.resume.contactLists;
      });

    this.store.select(selectClient).subscribe(client => {
      this.client = client;
    });

    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });


    // this.tryGetSessionWhatsapp()

  }

  tryGetSessionWhatsapp() {
    this.msgForm.controls.numberWhatsApp.valueChanges.subscribe(value => {
      this.sessionWhatsappService.get(value)
        .pipe(catchError(error => {
          this.toastr.error(`Problema ao recuperar a sessão do WhatsApp, por favor contacte o suporte!`);
          return throwError(() => new Error(error.message));
        }))
        .subscribe(res => {
          console.log('GET session', res);
          if (res.sessionWhtas?.session) {
            this.whatsSession.connected = true;
            this.whatsSession.session =  res.sessionWhtas.session;
          }
        });
    });
  }

  initializeWhatsConection() {

    this.socket.emit('initialize');

    this.socket.on('message', function (msg) {
      console.log('msg', msg);
    });

    this.socket.on('session', (session: SessionWhastAppType) => {
      this.whatsSession.connected = true;
      this.whatsSession.session = JSON.stringify(session);
      this.toastr.info('Conexão com o WhatsApp realizada!');

      this.sessionWhatsappService.post({ idUser: this.client.idUser, phone: this.msgForm.value?.numberWhatsApp, session: this.whatsSession.session })
        .pipe(catchError(error => {
          this.toastr.error(`Erro ao registrar a sessão do WhatsApp, por favor contacte o suporte!`);
          return throwError(() => new Error(error.message));
        }))
        .subscribe(res => {
          this.onSubmitForm();
          this.closeModal();
        });
    });

    this.socket.on('qr', (src) => {
      this.whatsSession.qrCode = src;
    });

    this.socket.on('ready', () => {
      console.log('WhatsApp ready');
    });

    this.socket.on('disconnectedServerBrowser', () => {
      console.log('disconnectedServerBrowser desconectado');
      this.socket.removeAllListeners();
      this.whatsSession.qrCode = '';
    });

  }

  selectMsgTemplate() {
    const index = this.msgForm?.value?.msgTemplate;
    const msgTemplate = this.listMsg[index];

    this.msgForm.patchValue({
      msg: msgTemplate?.message,
      image: msgTemplate?.picture
    })
  }

  openModal() {
    if (this.msgForm.invalid) {
      return this.msgForm.markAllAsTouched();

    }

    if (this.whatsSession?.connected) {
      this.onSubmitForm();

    } else {
      this.showModal = true;
      this.initializeWhatsConection();

    }

  }

  onSubmitForm() {
    const { listSend, numberWhatsApp, msg } = this.msgForm.value;

    this.messageService.send({ message: msg, phone: numberWhatsApp, idList: listSend, picture: '' })
      .pipe(catchError(error => {
        this.toastr.error(`Não foi possivel enviar a mensagem: ${error.error.message}`)
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {

        this.toastr.success(`Mensagem enviada com sucesso`);

        this.msgForm.reset({
          listSend: '',
          numberWhatsApp: '',
          msgTemplate: '',
          msg: '',
          image: ''
        })
      });
  }

  closeModal() {
    this.showModal = false;
    this.socket.emit('disconnectBrowser');
  }

}
