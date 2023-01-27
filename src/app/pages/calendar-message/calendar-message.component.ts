import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsw-calendar-message',
  templateUrl: './calendar-message.component.html',
  styleUrls: ['./calendar-message.component.scss']
})
export class CalendarMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('calendar')
  }

}
