import { Directive, ElementRef } from '@angular/core';
import { HtmlHelper } from '../helpers/html';

@Directive({ selector: '[dwsShowPassword]' })
export class ShowPasswordDirective {
    input: HTMLInputElement;
    buttonElement: HTMLButtonElement;
    buttonHtml: string;
    classIcon = {
        showed: 'fa-eye-slash',
        hidden: 'fa-eye'
    }
    typeInput = {
        showed: 'text',
        hidden: 'password'
    }
    get iconElement() {
        return this.buttonElement.querySelector('.far');
    }

    constructor(public el: ElementRef) {
        this.buttonHtml = `<button append type="button" class="input-group-text passwordshow__Button" (click)="tooglePassword()">
                    <i class="far ${this.classIcon.hidden}"></i>
                </button>`;

        this.input = el.nativeElement;
        this.buttonElement = HtmlHelper.createElementByStringHtml(this.buttonHtml) as HTMLButtonElement;
    }   
    
    ngOnInit(): void{
        console.info('OnInit');
        this.insertButton();
    }

    insertButton() {
        this.input.insertAdjacentElement('afterend', this.buttonElement);
        this.buttonElement.addEventListener('click', this.onClickButton.bind(this));
    }

    onClickButton() {
        this.showPassword(this.input.type == this.typeInput.hidden);
    }

    showPassword(show: boolean) {
        this.input.type = show ? this.typeInput.showed :  this.typeInput.hidden;
        this.iconElement.classList.remove(show ? this.classIcon.hidden : this.classIcon.showed);
        this.iconElement.classList.add(show ? this.classIcon.showed : this.classIcon.hidden);
    }


}