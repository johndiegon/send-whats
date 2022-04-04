import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateConfigService {
  
  getWeekDayDescription(day: number): string {
    switch(day) {
      case 0: return 'Domingo';
      case 1: return 'Segunda-feira';
      case 2: return 'Terça-feira';
      case 3: return 'Quarta-feira';
      case 4: return 'Quinta-feira';
      case 5: return 'Sexta-feira';
      case 6: return 'Sábado';
      default:
        break;
    }
  }

  constructor() { }

  public utcNow(): any {
    return timezone.tz(new Date(), 'UTC');
  }

  public convertToUTC(date: Date): any {
    return timezone.tz(date, 'UTC');
  }

  public convertTimeZone(specifiedUTCDate: Date) {
    return timezone.tz(specifiedUTCDate, 'America/Sao_Paulo');
  }

}
