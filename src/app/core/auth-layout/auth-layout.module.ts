import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterSucessComponent } from 'src/app/pages/register-sucess/register-sucess.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterSucessComponent
  ]
})
export class AuthLayoutModule { }
