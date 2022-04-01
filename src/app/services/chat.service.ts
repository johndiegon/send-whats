import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LastMessage } from '../models/LastMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  getLastMessage() : Observable<LastMessage> {
    return this.httpClient.get<LastMessage>(`${environment.FEATURE_API}/chat/lastmessage`)
    .pipe(
      map((response: LastMessage) => response)
    )
  }

  geChat(phoneClient: string) : Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('phone', phoneClient);
    return this.httpClient.get<any>(`${environment.FEATURE_API}/chat`, {params: httpParams})
    .pipe(
      map((response: any) => response)
    )
  }

}
