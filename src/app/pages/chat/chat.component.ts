import { ChangeDetectorRef, Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { StatusEnum } from 'src/app/Enum/StatusEnum';
import { ActiveMessageLast } from 'src/app/models/ActiveMessageLast';
import { Chat } from 'src/app/models/Chat';
import { ClientStoreType } from 'src/app/models/ClientType';
import { LastMessage } from 'src/app/models/LastMessage';
import { MessageBase } from 'src/app/models/MessageBase';
import { MessagesOnChat } from 'src/app/models/MessagesOnChat';
import { selectClient } from 'src/app/redux/selectors.store';
import { ChatService } from 'src/app/services/chat.service';
import { DateConfigService } from 'src/app/services/date-config.service';

@Component({
  selector: 'dsw-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selected = false;
  
   @ViewChild("textAreaMessage", {static: false}) textAreaMessage: ElementRef;
  client: ClientStoreType;
  selectedMessagesOnChat: Chat[] = [];
  listLastMessages: ActiveMessageLast[] = [];
  utcNow = this.dateConfigService.utcNow();
  messageForm: FormGroup;
  phoneMain =  {
    phone: '',
    name: ''
  }
  phoneClient = {
    phone: '',
    name: ''
  }

  constructor(
    private chatService: ChatService,
    private dateConfigService: DateConfigService,
    private store: Store,
    private fb: FormBuilder,
    private changeDetector : ChangeDetectorRef
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.store.select(selectClient).subscribe(data => {
      this.client = data;
      this.loadLastMessage();
    });
  }

  createForm() {
    this.messageForm = this.fb.group({
      typedMessage: ''
    });
  }

  get typedMessage() {
    return this.messageForm.get('typedMessage');
  }
  
  loadLastMessage() {
    this.chatService.getLastMessage().subscribe((result: LastMessage) => {
      if (result && result.data.status == StatusEnum.Sucessed) {
        this.phoneMain.phone = result.listLastMessages.phoneFrom;
        this.phoneMain.name = this.client.name;
        this.listLastMessages = result.listLastMessages.messageList;
      }      
    });
  }
  
  checkMessageNow(message: ActiveMessageLast) {    
    var duration = this.getDurationDateLastMessage(message.dateTime);
    return duration.asMinutes() <= 2;
  }

  getName(item: ActiveMessageLast) {
    if (item.phoneFrom == this.phoneMain.phone) {
      return item.nameTo;
    } else {
      return item.nameFrom;
    }
  }

  selectDialog(item: ActiveMessageLast) {
    if (item.checked) {
      return;
    }
    this.typedMessage.setValue('');
    this.resetPhoneCliente();
    this.selected = true;
    this.selectedMessagesOnChat = [];
    this.listLastMessages.map(x => x.checked = false);
    item.checked = true;
    this.focusMessage();  
    this.phoneClient.phone = item.phoneFrom == this.phoneMain.phone ? item.phoneTo : item.phoneFrom;
    this.phoneClient.name = item.phoneFrom == this.phoneMain.phone ? item.nameTo : item.nameFrom;
    if (this.phoneClient) {
      this.chatService.getChat(this.phoneClient.phone).subscribe((response: MessagesOnChat) => {
        if (response.data.status == StatusEnum.Sucessed) {
          if(response.messagesOnChat) {
            this.selectedMessagesOnChat = response.messagesOnChat;
          } else {
            this.selectedMessagesOnChat = [];
          }
        }
      });
    }
  }

  focusMessage() {
    this.changeDetector.detectChanges();
    this.textAreaMessage.nativeElement.focus();
  }

  resetPhoneCliente() {
    this.phoneClient.name = '';
    this.phoneClient.phone = '';
  }

  convertTimeZoneLastMessage(date: Date) {
    const dateLastMessage = this.dateConfigService.convertTimeZone(date);
    var duration = this.getDurationDateLastMessage(date);
    if (duration.asDays() < 1) {
      return dateLastMessage.hour().toString() + ':' + dateLastMessage.minute().toString();
    } else if (duration.asDays() > 1 && duration.asDays() <= 6) {
      return this.dateConfigService.getWeekDayDescription(dateLastMessage.day());
    } else {
      return dateLastMessage.format('DD/MM/YYYY');
    }    
  }

  convertTimeZoneChat(date: Date) {
    const dateLastMessage = this.dateConfigService.convertTimeZone(date);
    return dateLastMessage.hour().toString() + ':' + dateLastMessage.minute().toString();    
  }

  getDurationDateLastMessage(date: Date): moment.Duration {
    const dateLastMessage = this.dateConfigService.convertToUTC(date);
    return moment.duration(this.utcNow.diff(dateLastMessage));
  }

  sendMessage() {
    if (this.typedMessage.value && this.typedMessage.value.trim().length > 0) {//Criar um utils
      const messageTyped : Chat = {
        phoneFrom : this.phoneMain.phone,
        phoneTo : this.phoneClient.phone,
        dateTime : this.dateConfigService.utcNow(),
        message : this.typedMessage.value,
        wasVisible: false,
        urlPicture : '',        
      }
      this.selectedMessagesOnChat.push(messageTyped);
      var indexMessage = this.selectedMessagesOnChat.length - 1;
      this.typedMessage.setValue('');
      this.chatService.postChat(messageTyped).subscribe((response: MessageBase) => {
        if (response.data.status == StatusEnum.Sucessed) {
          this.selectedMessagesOnChat.map((value, i) => {
            if(i == indexMessage)  {
              value.wasVisible = true;
            }
          })
        }
      });
    } else {
      this.typedMessage.setValue('');
    }
    this.focusMessage();
  }
}
