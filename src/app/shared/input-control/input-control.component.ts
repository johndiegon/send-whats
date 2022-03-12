import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { InputRefDirective } from './input-ref.directive';
import { MESSAGE_MAP } from './message-map-default';

@Component({
  selector: 'dsw-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent implements OnInit {
  @Input() for: string;
  @Input() label: string;
  @Input() iconAddon: string;
  @Input() showAppend: boolean;
  @Input() errorMsgMap: {[key: string]: string}

  @ContentChild(InputRefDirective)
  InputRef: InputRefDirective;
  _errorMsgMap: {[key: string]: string}

  constructor() {
   }

  ngOnInit(): void {
    this._errorMsgMap = {
      ...MESSAGE_MAP,
      ...this.errorMsgMap
    }
  }

  get inputControl(){
    return this.InputRef?.control
  }

  get touched() {
    return this.inputControl.touched;
  }

  get valid(){
    return this.inputControl.valid;
  }

  ngAfterViewInit(): void {
  }
}
