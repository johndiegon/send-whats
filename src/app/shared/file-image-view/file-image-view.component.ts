import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dsw-file-image-view',
  templateUrl: './file-image-view.component.html',
  styleUrls: ['./file-image-view.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileImageViewComponent),
      multi: true
    }]
})
export class FileImageViewComponent implements OnInit, ControlValueAccessor {
  onChange: (e: any) => void;
  onTouch: () => void;
  isDisabled: boolean;
  value = '';
  valueInput;

  constructor() { }

  writeValue(imageUrl: string): void {
    this.value = imageUrl;
    this.valueInput = imageUrl.startsWith('data:image/jpeg') ? imageUrl : '';
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

  ngOnInit(): void {
  }

  removeImage(){
    this.value = '';
    this.valueInput = '';
    this.onChange(this.value);
  }

  onchangeFile(event: Event) {
    var reader = new FileReader();

    reader.onload = (evt) => {
      this.value = evt.target.result.toString();

      this.onChange(this.value);
    };

    reader.readAsDataURL((event.target as HTMLInputElement).files[0]);
  }
}
