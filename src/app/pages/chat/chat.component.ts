import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { StatusEnum } from 'src/app/Enum/StatusEnum';
import { ActiveMessageLast } from 'src/app/models/ActiveMessageLast';
import { Chat } from 'src/app/models/Chat';
import { ClientStoreType } from 'src/app/models/ClientType';
import { LastMessage } from 'src/app/models/LastMessage';
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
  client: ClientStoreType;
  selectedMessagesOnChat: Chat[] = [];
  phoneUser = '';
  phoneMain = '';
  listLastMessages: ActiveMessageLast[] = [];
  utcNow = this.dateConfigService.utcNow();

  constructor(
    private chatService: ChatService,
    private dateConfigService: DateConfigService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.select(selectClient).subscribe(data => {
      this.client = data;
      this.loadLastMessage();
    });
  }
  
  loadLastMessage() {
    this.chatService.getLastMessage().subscribe((result: LastMessage) => {
      if (result && result.data.status == StatusEnum.Sucessed) {
        this.phoneUser = result.listLastMessages.phoneFrom;
        this.listLastMessages = result.listLastMessages.messageList;
      }      
    });
  }
  
  checkMessageNow(message: ActiveMessageLast) {    
    var duration = this.getDurationDateLastMessage(message.dateTime);
    return duration.asMinutes() <= 2;
  }

  getName(item: ActiveMessageLast) {
    if (item.phoneFrom == this.phoneUser) {
      return item.nameTo;
    } else {
      return item.nameFrom;
    }
  }

  selectDialog(item: ActiveMessageLast) {
    this.selected = true;
    this.selectedMessagesOnChat = [];
    this.listLastMessages.map(x => x.checked = false);
    item.checked = true;
    this.phoneMain = item.phoneFrom == this.phoneUser ? item.phoneTo : item.phoneFrom;
    if (this.phoneMain) {
      this.chatService.getChat(this.phoneMain).subscribe((response: MessagesOnChat) => {
        if (response.data.status == StatusEnum.Sucessed) {
          this.selectedMessagesOnChat = response.messagesOnChat;
        }
        console.log(this.selectedMessagesOnChat);
      });
    }
  }

  convertTimeZone(date: Date) {
    const dateLastMessage = this.dateConfigService.convertTimeZone(date);
    var duration = this.getDurationDateLastMessage(date);

    if (duration.asDays() < 1) {
      return dateLastMessage.hour().toString() + ':' + dateLastMessage.minute().toString();
    } else if (duration.asDays() > 1 && duration.asDays() < 7) {
      return dateLastMessage.day().toLocaleString();
    }

    return '';
  }

  getDurationDateLastMessage(date: Date): moment.Duration {
    const dateLastMessage = this.dateConfigService.convertToUTC(date);
    return moment.duration(this.utcNow.diff(dateLastMessage));
  }

}
