import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActiveMessageLast } from 'src/app/models/ActiveMessageLast';
import { LastMessage } from 'src/app/models/LastMessage';
import { ChatService } from 'src/app/services/chat.service';
import { DateConfigService } from 'src/app/services/date-config.service';

@Component({
  selector: 'dsw-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  listLastMessages: ActiveMessageLast[] = [];

  constructor(
    private chatService: ChatService,
    private dateConfigService: DateConfigService
  ) { }

  ngOnInit() {
    this.loadLastMessage();
  }
  loadLastMessage() {
    this.chatService.getLastMessage().subscribe((result: LastMessage) => {
      if (result) {
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

}
