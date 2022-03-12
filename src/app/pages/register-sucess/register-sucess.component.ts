import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'dsw-register',
  templateUrl: './register-sucess.component.html',
  styleUrls: ['./register-sucess.component.scss']
})
export class RegisterSucessComponent implements OnInit {

  emailConfirmed = false;

  constructor(
    private activatedR: ActivatedRoute,
    private toastr: ToastrService,
    private clienService: ClientService) { }

  ngOnInit() {
    const emailValidate = this.activatedR.snapshot.queryParams['validaemail'];
    if (emailValidate) {
      this.clienService.confirmEmail(emailValidate)
      .pipe(catchError(error => {
        this.toastr.error('Não foi possivel confirmar se email, por favor entre em contato com o suporte!')
        return error;
      }))
      .subscribe(_ => {
        this.emailConfirmed = true;
      });

      
    }
  }
}
