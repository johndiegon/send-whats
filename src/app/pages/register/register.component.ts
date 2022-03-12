import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AddressType } from 'src/app/models/AddressType';
import { AddressService } from 'src/app/services/address.service';
import { ClientService } from 'src/app/services/client.service';
import { MultiInputValidators } from 'src/app/shared/multi-input-list/multi-input-validator.directive';
import { samePasswordValidator } from 'src/app/shared/validators/same-password.directive';

@Component({
  selector: 'dsw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private clienService: ClientService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    docNumber: ['', Validators.required],
    docType: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      address: ['', Validators.required],
      district: [''],
      uf: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(8)]],
      country: [''],
      complemento: ['']
    }),
    phone: [[], [Validators.required, MultiInputValidators.minItemValidator(1)]],
    user: this.fb.group({
      password: ['', Validators.required],
      passwordAgain: ['', [Validators.required]]
    }, { validators: [samePasswordValidator('password', 'passwordAgain')] })
  });

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.registerForm.markAllAsTouched();


    if (this.registerForm.valid) {
      this.clienService
        .create(this.registerForm.value)
        .pipe(catchError(error => {

          this.toastr.error('Não foi possivel finalizar seu cadastro, por favor entre em contato com o suporte!')

          return throwError(() => error);
        }))
        .subscribe(_ => {

          this.router.navigate(['step2'], { relativeTo: this.activatedRoute });
        })
    } else {
      this.toastr.error('Por favor, corrija os erros no formulário!');
    }
  }

  dispatchSearchZipCode() {
    const zipCode = this.registerForm.value.address?.zipCode;
    
    if (zipCode.length >= 8) {
      this.addressService.getAddressByZipCode(zipCode)
        .subscribe((res: { address: AddressType }) => {
          const { address } = res;

          this.registerForm
            .patchValue({
              address: {
                address: address.address,
                district: address.district,
                uf: address.uf,
                city: address.city,
                country: address.country
              }
            })
        })
    }

  }
}
