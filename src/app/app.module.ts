import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AddressService } from './services/address.service';
import { AuthTokenInterceptor } from './core/auth.interceptor';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { clientReducer } from './redux/reducers/client.reducer';
import { hydrationMetaReducer } from './redux/meta-reducers/hydrationMetaReducer';
import { ClientService } from './services/client.service';
import { ContactListService } from './services/contact-list.service';
import { MessageService } from './services/message.service';
import { messageReducer } from './redux/reducers/message.reducer';
import { LOCALE_ID } from '@angular/core';

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { SessionWhatsappService } from './services/session-whatsapp.service';
registerLocaleData(localePt)

export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ client: clientReducer, messages: messageReducer }, { metaReducers })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthService,
    AddressService,
    ClientService,
    ContactListService,
    MessageService,
    SessionWhatsappService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
