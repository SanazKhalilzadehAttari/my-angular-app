import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'date';
  @Input() maxDate: Date | undefined;
  bsConfig: Partial<BsDatepickerConfig> | undefined;
  constructor(@Self() public ngControll: NgControl) {
    this.ngControll.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat:'DD MMMM YYYY'
    }

  }
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }
  get control(): FormControl {
    return this.ngControll.control as FormControl
  }
}
