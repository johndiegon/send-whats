import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateConfigService {

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
