import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { valueToFormat2, unmaskValue } from './mask';

@Directive({
    selector: '[dwsMask]',
})
export class MaskDirective implements OnInit {

    @Input() dwsMask: string;

    private _lastMaskedValue = '';

    constructor(
        private control: NgControl,
    ) { }

    ngOnInit() {

        if (!this.control || !this.control.valueAccessor) {
            return;
        }

        this._onReceiveValue();
        this._onChangeValue();
        this._maskInitialValue();
    }

    private _maskInitialValue() {
        this._setVal(this._maskValue(this.control.value || ''));
    }

    private _onChangeValue() {
        const originalChange = (<any>this.control.valueAccessor)['onChange'].bind(this.control.valueAccessor);
        this.control.valueAccessor.registerOnChange((val: any) => {
            const t = originalChange(this._unmaskValue(val));

            return t;
        });
    }

    private _onReceiveValue() {
        const originalWriteVal = this.control.valueAccessor.writeValue.bind(this.control.valueAccessor);
        this.control.valueAccessor.writeValue = (val: any) => {
            const t = originalWriteVal(this._maskValue(val));

            return t;
        };
    }

    private _maskValue(val: string): string {
        if (!this.dwsMask || val === this._lastMaskedValue) {
            return val;
        }

        const maskedVal = this._lastMaskedValue =
        valueToFormat2(
                val,
                this.dwsMask, this._lastMaskedValue.length > val.length,
                this._lastMaskedValue);

        return maskedVal;
    }

    private _unmaskValue(val: string): string {
        const maskedVal = this._maskValue(val);
        const unmaskedVal = unmaskValue(maskedVal);

        if (maskedVal !== val) {
            this._setVal(maskedVal);
        }

        return maskedVal;
    }

    private _setVal(val: string) {
        if (this.control.control) {
            this.control.control.setValue(val, { emitEvent: false });
        }
    }

}