import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, FormControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[dwsMultiInputValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MultiInputDirectiveValidator, multi: true }]
})
export class MultiInputDirectiveValidator implements Validator {
    @Input() minLength: number;
    @Input() maxLength: number;

    validate(formControl: FormControl): ValidationErrors | null {
        if (this.minLength) {
            return MultiInputValidators.minItemValidator(this.minLength)(formControl);
        }
        else if (this.maxLength) {
            return MultiInputValidators.maxItemValidator(this.maxLength)(formControl);
        }
    }
}

export class MultiInputValidators {
    static minItemValidator(minLength: number): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {
            if (control.value.length < minLength) {

                return { minlength: { requiredLength: minLength } };
            }
            return null;
        }
    }

    static maxItemValidator(maxLength: number): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {
            if (control.value.length > maxLength) {

                return { maxLength: { requiredLength: maxLength } };
            }
            return null;
        }
    }
}

