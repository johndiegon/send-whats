import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../redux/selectors.store';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { statusError } from '../variables/statusError';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    AUTH_TOKEN;

    constructor(private store: Store, private authService: AuthService, private toastr: ToastrService) {
        this.store.select(selectToken)
            .subscribe(token => this.AUTH_TOKEN = token)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;


        const skipInsertAuthToken = req.headers.get('Skip-Auth-Iterceptor');

        if (this.AUTH_TOKEN && !skipInsertAuthToken) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.AUTH_TOKEN}` } });
        }

        return next
            .handle(authReq)
            .pipe(catchError<any, any>((e: HttpErrorResponse) => {
                switch(e.status){
                    case statusError.Unauthorized:
                        this.signOut();
                        return throwError(() => e);
                    case statusError.unknown:
                        this.toastr.warning('Não foi possivel se conectar com o servidor!');
                        return throwError(() => new Error(e.message));
                    default:
                        return throwError(() => e);  
                }                
            }))
    }

    private signOut() {
        this.authService.SignOut()
            .subscribe(_ => {
                this.toastr.warning('Sua sessão expirou, realize o login novamente!');
            });
    }
}