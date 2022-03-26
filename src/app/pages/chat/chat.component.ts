import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { StatusEnum } from 'src/app/Enum/StatusEnum';
import { ActiveMessageLast } from 'src/app/models/ActiveMessageLast';
import { ClientStoreType } from 'src/app/models/ClientType';
import { LastMessage } from 'src/app/models/LastMessage';
import { LastMessageContact } from 'src/app/models/LastMessageContact';
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
  listLastMessages: ActiveMessageLast[] = [];

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
    const utcNow = this.dateConfigService.utcNow();
    const dateLastMessage = this.dateConfigService.convertToUTC(message.dateTime);
    var duration = moment.duration(utcNow.diff(dateLastMessage));
    return duration.asMinutes() <= 2;
  }

  selectDialog(item: ActiveMessageLast) {
    console.log(item);
  }

}
