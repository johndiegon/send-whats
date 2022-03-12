import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[dwsPhoneValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneValidator, multi: true }]
})
export class PhoneValidator implements Validator {

    validate(formControl: FormControl): ValidationErrors | null {
        const regexPhone = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;
        return regexValidator(regexPhone)(formControl);
    }
}

export function regexValidator(regex: RegExp): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        if (!regex.test(control.value) && control.value) {
            return { phoneValidator: true };
        }
        return null;
    }
}