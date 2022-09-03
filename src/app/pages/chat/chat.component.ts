import { ChangeDetectorRef, Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HubConnectionBuilder } from '@microsoft/signalr';
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
import { environment } from 'src/environments/environment';

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
  uriWhatsDialog = 'https://wa.me/';
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
      //this.createConnectionSignalR();
      this.loadLastMessage();
    });
  }

  createConnectionSignalR() {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyIzYmNhZDM5Yi1iMjkwLTQ4MTEtYjg0Mi1mMmE4NTQ1ZjZkM2QiLCIzYmNhZDM5Yi1iMjkwLTQ4MTEtYjg0Mi1mMmE4NTQ1ZjZkM2QiXSwianRpIjoiNTVkOWZjNzFlOWYxNDYxMGIzODNmYzU4OTE1NjU2MDUiLCJDdWx0dXJlIjoicHQtQlIiLCJDbGFpbXMiOiJbe1wiSXNzdWVyXCI6XCJMT0NBTCBBVVRIT1JJVFlcIixcIk9yaWdpbmFsSXNzdWVyXCI6XCJMT0NBTCBBVVRIT1JJVFlcIixcIlByb3BlcnRpZXNcIjp7fSxcIlN1YmplY3RcIjpudWxsLFwiVHlwZVwiOlwiVXNlck5hbWVcIixcIlZhbHVlXCI6XCJUZWNoIExlYWRcIixcIlZhbHVlVHlwZVwiOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjc3RyaW5nXCJ9LHtcIklzc3VlclwiOlwiTE9DQUwgQVVUSE9SSVRZXCIsXCJPcmlnaW5hbElzc3VlclwiOlwiTE9DQUwgQVVUSE9SSVRZXCIsXCJQcm9wZXJ0aWVzXCI6e30sXCJTdWJqZWN0XCI6bnVsbCxcIlR5cGVcIjpcIlJlZ2lzdHJhdGlvbk51bWJlcnNcIixcIlZhbHVlXCI6XCJbXFxcIjY3MzgwMTcwMDAwMTEwXFxcIixcXFwiNjczODAxNzAwMDA3MDVcXFwiLFxcXCI2NzM4MDE3MDAwMDIwOVxcXCIsXFxcIjY3MzgwMTcwMDAwNDYyXFxcIixcXFwiNjczODAxNzAwMDA1NDNcXFwiXVwiLFwiVmFsdWVUeXBlXCI6XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNzdHJpbmdcIn0se1wiSXNzdWVyXCI6XCJMT0NBTCBBVVRIT1JJVFlcIixcIk9yaWdpbmFsSXNzdWVyXCI6XCJMT0NBTCBBVVRIT1JJVFlcIixcIlByb3BlcnRpZXNcIjp7fSxcIlN1YmplY3RcIjpudWxsLFwiVHlwZVwiOlwiQ29tcGFuaWVzR3VpZFwiLFwiVmFsdWVcIjpcIltcXFwiMjUyNmY2YzctYzRkMC00NjcxLTk5OWEtMzc4MjI3OGQ5MzkyXFxcIixcXFwiY2RjOTg4ZWUtYWI3Yi00NWQwLWFmMjEtZWQ1NTI3ZmUyNzY1XFxcIixcXFwiMjhhOGFjNWItM2UyZS00Yjk3LTgwY2EtYmNjNGJkYzEwZTRiXFxcIixcXFwiMTc3Y2U2YjYtMWQwZi00OWU1LTliMzgtMTgzZWYwMTNkZTEwXFxcIixcXFwiM2MzMzIwNWEtOTMyMS00Y2U3LWFkY2QtOGM2OWM2Y2RhNzM4XFxcIl1cIixcIlZhbHVlVHlwZVwiOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjc3RyaW5nXCJ9LHtcIklzc3VlclwiOlwiTE9DQUwgQVVUSE9SSVRZXCIsXCJPcmlnaW5hbElzc3VlclwiOlwiTE9DQUwgQVVUSE9SSVRZXCIsXCJQcm9wZXJ0aWVzXCI6e30sXCJTdWJqZWN0XCI6bnVsbCxcIlR5cGVcIjpcIkZpcnN0QWNjZXNzXCIsXCJWYWx1ZVwiOlwiMVwiLFwiVmFsdWVUeXBlXCI6XCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSNzdHJpbmdcIn1dIiwibmJmIjoxNjUxMDk5MTYwLCJleHAiOjE2NTExMjA3NjAsImlhdCI6MTY1MTA5OTE2MCwiaXNzIjoiTU1hcnJhSXNzdWVyIiwiYXVkIjoiTU1hcnJhQXVkaWVuY2UifQ.Iv0bcY42n18HRMAk_ldFXIfdV1IoEKChuqxDKdrO7p8';
    let connection = new HubConnectionBuilder()
    .withUrl(environment.FEATURE_API + "/chat", { accessTokenFactory: () => this.client.user.token })
    .build();
    
    connection.on('broadcastNewMessage', data => {
       this.showMessageOnChat(data);
    });

    connection.start();
    //.then(() => console.log('Startado') );

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
        if (result.listLastMessages.messageList && result.listLastMessages.messageList.length > 0) {
          this.listLastMessages = result.listLastMessages.messageList.sort((a,b) =>
            new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          );
        }
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

  showMessageOnChat(chat: Chat) {
    if (this.phoneClient.phone == chat.phoneFrom) {
      this.selectedMessagesOnChat.push(chat);
    }
  }
}
