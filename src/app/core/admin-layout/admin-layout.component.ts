import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'dsw-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private clientService: ClientService
    ) { }

  ngOnInit() {
    this.clientService.get().subscribe(_ => _);
    this.messageService.get().subscribe(_ => _);
  }

}
