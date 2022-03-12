import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionWhastAppReqType, SessionWhatResGetType } from '../models/SessionWhastAppType';
import { environment } from 'src/environments/environment';
import { ReponseWrapper } from '../models/response-api-default';

@Injectable({providedIn: 'root'})
export class SessionWhatsappService {
    constructor(private httpClient: HttpClient) { }
    
    post(session: SessionWhastAppReqType) {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/Session`, session, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    get(phone: string) {
        return this.httpClient.get<ReponseWrapper<SessionWhatResGetType>>(`${environment.FEATURE_API}/Session?phone=${phone}`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }
}