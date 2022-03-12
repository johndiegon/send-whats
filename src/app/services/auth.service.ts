import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { ClientApiType, UserStoreType, UserType } from '../models/ClientType';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectUser } from '../redux/selectors.store';
import { signin as signinAction, signout } from '../redux/actions/client.action';
import { ReponseWrapper } from '../models/response-api-default';

@Injectable({ providedIn: 'root' })
export class AuthService {
    userClient: UserStoreType;
    hoursInMiliseconds = 3600000;
    hoursLimitToken = 2;

    constructor(private httpClient: HttpClient, private store: Store) {
        store.select(selectUser)
            .subscribe(res => {
                this.userClient = res
            });

    }

    signIn({ login, password, role }: UserType) {

        return this.httpClient
            .post<ReponseWrapper<ClientApiType>>(`${environment.FEATURE_API}/Authenticate/login`, { login, password, role }, {
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                    , 'Content-Type': 'application/json'
                    , 'Access-Control-Allow-Origin': '*'
                }
            }).pipe(map(res => {
                const { role, id, login, token } = res.user;
                const limitLoggedIn =  Date.now() + (this.hoursLimitToken * this.hoursInMiliseconds);
                this.store.dispatch(signinAction({ signed: true, role, id, login, token, limitLoggedIn }));
                return res;
            }));
    }

    SignOut(): Subject<boolean> {
        const subject = new Subject<boolean>();

        setTimeout(() => {
            this.store.dispatch(signout())
            subject.next(true);
        }, 0);

        return subject;
    }

    checkLogin(): boolean {        
        if(this.userClient?.limitLoggedIn < Date.now()){
            this.SignOut();
            return false;
        }
        return this.userClient.signed;
    }



}