import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReponseWrapper } from '../models/response-api-default';
import { environment } from 'src/environments/environment';
import { MessagePutType, MessageResponseType, MessageSendType, MessageType } from '../models/MessageType';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { updateAll } from '../redux/actions/message.action';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(
        private httpClient: HttpClient,
        private store: Store,
        private toastr: ToastrService
    ) { }

    get() {
        return this.httpClient.get<ReponseWrapper<MessageResponseType>>(`${environment.FEATURE_API}/Message`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        }).pipe(
            catchError(error => {
                this.toastr.error('Erro ao procurar a lista de mensagens, por favor contacte o suporte!');
                return throwError(() => new Error(error.message));
            }),
            map(res => {
                this.store.dispatch(updateAll({ messages: res.messages }))
            })
        );
    }

    post(message: string, title: string) {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/Message?message=${encodeURIComponent(message)}&title=${encodeURIComponent(title)}`, {}, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    put(message: MessagePutType) {
        return this.httpClient.put<ReponseWrapper>(`${environment.FEATURE_API}/Message`, message, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    delete(message: MessageType) {
        return this.httpClient.delete<ReponseWrapper>(`${environment.FEATURE_API}/Message?idMessage=${encodeURIComponent(message.id)}`, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }

    send(message: MessageSendType) {
        return this.httpClient.post<ReponseWrapper>(`${environment.FEATURE_API}/Message/send-message`, message, {
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }
}


export const mockMsgs: MessageType[] = []