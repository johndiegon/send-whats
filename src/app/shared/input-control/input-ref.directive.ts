import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { FormControl, NgControl, NgModel } from "@angular/forms";

@Directive({
    selector: '[dwsInputSlot]'
})
export class InputRefDirective {
    constructor(public el: ElementRef, public control: NgControl) {
    }

    focus = false;

    @HostListener("focus")
    onFocus(teste) {
        this.focus = true;
    }

    @HostListener("blur")
    onBlur() {
        this.focus = false;
    }
}