import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { MessagePutType, MessageType } from 'src/app/models/MessageType';
import { selectMessages } from 'src/app/redux/selectors.store';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'dsw-msg-default',
  templateUrl: './msg-default.component.html',
  styleUrls: ['./msg-default.component.scss']
})
export class MsgDefaultComponent implements OnInit {
  showModal: boolean;
  msgToDelete: MessageType;
  editMsgFlag: boolean;

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService,
    private store: Store,
    private fb: FormBuilder
  ) { }

  listMsg: MessageType[];

  ngOnInit(): void {

    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });
  }

  msgForm = this.fb.group({
    id: [''],
    idClient: [''],
    title: ['', Validators.required],
    msg: ['', Validators.required],
    image: ['']
  })

  private getMessages() {
    this.messageService.get()
      .subscribe(_ => _);
  }

  editMsg(msg: MessageType) {
    this.editMsgFlag = true;

    this.msgForm.patchValue({
      id: msg.id,
      idClient: msg.idClient,
      title: msg.title,
      msg: msg.message,
      image: msg.picture
    })
  }

  onSubmitForm(event: Event) {
    event.preventDefault();

    if (this.msgForm.invalid) {
      this.msgForm.markAllAsTouched();
      return;
    }

    if (this.editMsgFlag) {
      this.updateMessage();
    } else {
      this.postNewMessage();
    }
  }

  private postNewMessage() {
    this.messageService.post(this.msgForm.value.msg, this.msgForm.value.title)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao cadastrar nova mensagem, por favor contacte o suporte!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {
        this.toastr.success('Mensagem criada com sucesso!');
        this.getMessages();
        this.msgForm.reset({ title: '', msg: '', image: '' });
        this.editMsgFlag = false;
      });
  }

  private updateMessage() {
    const { id, idClient, title, msg, image } = this.msgForm.value;
    const message: MessagePutType = { idMessage: id, idClient, message: msg, title, picture: image };
    this.messageService.put(message)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao editar mensagem, por favor contacte o suporte!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {
        this.toastr.success('Mensagem atualizada com sucesso!');
        this.getMessages();
        this.msgForm.reset({ title: '', msg: '', image: '' });
        this.editMsgFlag = false;
      });
  }

  deleteMsg() {
    this.messageService.delete(this.msgToDelete)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao deletar mensagem, por favor contacte o suporte!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {
        this.msgToDelete = undefined;
        this.closeModal();
        this.toastr.success('Mensagem deletada com sucesso!');
        this.getMessages();
      });
  }

  openModal(msg: MessageType) {
    this.showModal = true;
    this.msgToDelete = msg;
  }

  closeModal() {
    this.showModal = false;
  }
}