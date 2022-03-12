import { Component, ElementRef, forwardRef, Input, ViewChild } from "@angular/core"
import { DefaultValueAccessor, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const typeFormatWhats = {
    bold: '*',
    italic: '_',
    strikethrough: '~',
    monospace: '```'
}

@Component({
    selector: 'dsw-text-edit',
    templateUrl: './text-edit.component.html',
    styleUrls: ['./text-edit.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => TextEditComponent),
          multi: true
        }]
})
export class TextEditComponent implements ControlValueAccessor {
    @Input() bold = true;
    @Input() italic = true;
    @Input() strikethrough = true;
    @Input() monospace = true;
    @Input() smiles = true;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;
    textSelected;
    _value: string;
    onChange: (e: any) => void;
    onTouch: () => void;
    isDisabled: boolean;

    constructor() {
    }

    writeValue(string: string): void {
        this._value = string;
    }

    registerOnChange(fn: any): void { 
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void { 
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void { 
        this.isDisabled = isDisabled;
    }

    onKeypress() {
        this.onChange(this._value);
    }

    format(command) {
        const el = this.textArea.nativeElement;
        const startSelect = el.selectionStart;
        const endSelect = el.selectionEnd
        switch (command) {
            case "bold":
            case "italic":
            case "strikethrough":
            case "monospace":
                
                el.value = this.insertCharIndex(typeFormatWhats[command], endSelect, el.value);
                el.value = this.insertCharIndex(typeFormatWhats[command], startSelect, el.value);
                
                break;
            case "emoji":
                break;
        }

        this.onChange(el.value);
    }

    insertCharIndex(insertString: string, index: number, value: string) {
        return value.substr(0, index) + insertString + value.substr(index);
    }
}

type selectionReturn = { start: number, end: number, text: string }