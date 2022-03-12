import { Directive, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[dwssamePassword]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SamePasswordValidatorDirective, multi: true }]
})
export class SamePasswordValidatorDirective implements Validator {
    @Input('firstFormControl') firstFormControl: string;
    @Input('secondFormControl') secondFormControl: string;


    validate(formControl: FormControl): ValidationErrors | null {
        return samePasswordValidator(this.firstFormControl, this.secondFormControl)(formControl);
    }
}

export function samePasswordValidator(firstFormControl: string, secondFormControl: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const firstInput = formGroup.get(firstFormControl);
        const secondInput = formGroup.get(secondFormControl);

        if (firstInput?.value != secondInput?.value) {
            secondInput.setErrors({ samePassword: true });
            return { samePassword: true }
        } else {
            if (secondInput.errors?.['samePassword']) {
                delete secondInput.errors['samePassword'];
            }
            return null;
        }
    }
}