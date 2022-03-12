import { Routes } from '@angular/router';
import { RegisterSucessComponent } from 'src/app/pages/register-sucess/register-sucess.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        children: [
            { path: '', component: RegisterComponent },
            { path: 'step2', component: RegisterSucessComponent }
        ]
    }

];
