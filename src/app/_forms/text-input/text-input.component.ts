import { Component, Input, OnInit, Optional, Self, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { RegisterComponent } from '../../register/register.component';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label= '';
  @Input() type = 'text';
  

  constructor(@Self() public ngControll: NgControl) {
    this.ngControll.valueAccessor = this;

  }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }
 
  get control(): FormControl {
    return this.ngControll.control as FormControl
  }

}
