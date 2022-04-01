import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { StatusEnum } from 'src/app/Enum/StatusEnum';
import { ActiveMessageLast } from 'src/app/models/ActiveMessageLast';
import { ClientStoreType } from 'src/app/models/ClientType';
import { LastMessage } from 'src/app/models/LastMessage';
import { selectClient } from 'src/app/redux/selectors.store';
import { ChatService } from 'src/app/services/chat.service';
import { DateConfigService } from 'src/app/services/date-config.service';

@Component({
  selector: 'dsw-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  client: ClientStoreType;
  phoneUser = '';
  phoneClient = '';
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
    this.listLastMessages.map(x => x.checked = false);
    item.checked = true;
    this.phoneClient = item.phoneFrom == this.phoneUser ? item.phoneTo : item.phoneFrom;
    if (this.phoneClient) {
      this.chatService.geChat(this.phoneClient).subscribe((response: any) =>{
        console.log(response);
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
