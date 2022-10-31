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

  step = 1;
  steps = [
    {step: 1, complet: false},
    {step: 2, complet: false},
    {step: 3, complet: false},
    {step: 4, complet: false},
  ];
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
    docType: [1, Validators.required],
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
    phone: ['', [Validators.required, MultiInputValidators.minItemValidator(1)]],
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
      this.registerForm.get('phone').setValue([this.registerForm.get('phone').value]);
      this.clienService
        .create(this.registerForm.value)
        .pipe(catchError(error => {

          this.toastr.error('Não foi possivel finalizar seu cadastro, por favor entre em contato com o suporte!')

          return throwError(() => error);
        }))
        .subscribe(_ => {

          this.router.navigate(['step2'], { relativeTo: this.activatedRoute });
        });
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
            });
        });
    }

  }
  nextStep() {
    switch (this.step) {
      case 1:
        if (this.registerForm.get('name').valid &&
          this.registerForm.get('lastName').valid &&
          this.registerForm.get('email').valid &&
          this.registerForm.get('docType').valid &&
          this.registerForm.get('docNumber').valid) {
            this.steps[0].complet = true;
            this.step = 2;
        } else {
          this.registerForm.get('name').markAllAsTouched();
          this.registerForm.get('lastName').markAllAsTouched();
          this.registerForm.get('email').markAllAsTouched();
          this.registerForm.get('docType').markAllAsTouched();
          this.registerForm.get('docNumber').markAllAsTouched();
          this.toastr.warning('Por favor, corrija os erros no formulário!');
        }
        break;
      case 2:
        if (this.registerForm.get('address').get('zipCode').valid &&
          this.registerForm.get('address').get('address').valid &&
          this.registerForm.get('address').get('number').valid &&
          this.registerForm.get('address').get('complemento').valid &&
          this.registerForm.get('address').get('district').valid &&
          this.registerForm.get('address').get('city').valid &&
          this.registerForm.get('address').get('uf').valid
         ) {
          this.steps[1].complet = true;
          this.step = 3;
        } else {
          this.registerForm.get('address').get('zipCode').markAllAsTouched();
          this.registerForm.get('address').get('address').markAllAsTouched();
          this.registerForm.get('address').get('number').markAllAsTouched();
          this.registerForm.get('address').get('complemento').markAllAsTouched();
          this.registerForm.get('address').get('district').markAllAsTouched();
          this.registerForm.get('address').get('city').markAllAsTouched();
          this.registerForm.get('address').get('uf').markAllAsTouched();
          this.toastr.warning('Por favor, corrija os erros no formulário!');
        }
        break;
      case 3:
        if (this.registerForm.get('phone').valid) {
          this.steps[2].complet = true;
          this.step = 4;
        } else {
          this.registerForm.get('phone').markAllAsTouched();
          this.toastr.warning('Por favor, corrija os erros no formulário!');
        }
        break;
    }
  }
}
