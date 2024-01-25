import { Component, HostListener, Input, OnInit, Optional, Self, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { RegisterComponent } from '../../register/register.component';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor, OnInit  {
  @Input() label = '';
  @Input() type = 'text';
  private onChangeCallback: (_: any) => void = () => { };
  private onTouchedCallback: () => void = () => { };


  constructor(@Self() public ngControll: NgControl) {
    this.ngControll.valueAccessor = this;

  }
  ngOnInit() {
   /* const validators = [Validators.required];
    this.control.setValidators(validators);
    this.control.updateValueAndValidity();*/
  }
  registerOnChange(fn: any): void {
  //  this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
   // this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  get control(): FormControl {
    return this.ngControll.control as FormControl
  }

}
