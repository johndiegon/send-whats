import { AfterViewChecked, ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NgForm, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Random } from '../helpers/random';
import { InputRefDirective } from '../input-control/input-ref.directive';

@Component({
  selector: 'dsw-multi-input-list',
  templateUrl: './multi-input-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./multi-input-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiInputListComponent),
      multi: true
    }]
})
export class MultiInputListComponent implements ControlValueAccessor {
  @Input() idGroup: string;
  @Input() classInput: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() touched: boolean;
  @ViewChildren(NgModel) InputRef: QueryList<NgModel>;

  disabled: boolean;

  _val: { [key: string]: string } = {};
  list_inputs = [];

  lastIndex = 0;
  onChange: (_: any) => void
  onTouched: () => void

  get _length() {
    return Object.keys(this._val).length;
  }

  constructor() {
    this.createInput(Random.makeNewKey(5, this.lastIndex), "");
  }

  ngOnChanges() {
    this.InputRef?.forEach(control => {
      if (this.touched) {
        control.control.markAsTouched();
      }
    });
  }

  addNewInput() {
    if (!this.disabled) {
      this.lastIndex++;
      this.createInput(Random.makeNewKey(5, this.lastIndex), "");
      this.dispatchChange();
      this.dispatchTouch();
    }
  }

  createInput(key: string, value: string) {
    this._val[key] = value;
    this.list_inputs.push(key);
  }

  resetInputs() {
    this._val = {};
    this.list_inputs = [];
  }

  removeInput(key) {
    if (!this.disabled) {
      delete this._val[key];
      this.list_inputs.splice(this.list_inputs.indexOf(key), 1)

      this.dispatchChange();
      this.dispatchTouch();
    }
  }

  writeValue(array: string[]): void {

    if (Array.isArray(array)) {
      if (!array.length) {
        array = [""];
      }

      this.resetInputs();

      array.forEach((item, i) => {
        this.lastIndex = i;
        this.createInput(Random.makeNewKey(5, this.lastIndex), item);
      });

    } else {
      throw new Error("O valor do MultiInputListComponent deve ser um array")
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  dispatchChange() {
    const arrayValues = Object.values(this._val);
    const arrayCleaned = arrayValues.filter(val => val);

    this.onChange(arrayCleaned);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  dispatchTouch() {
    this.onTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
