import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Validation } from '../layouts/base/pages/components/transactions-table/transactions-table.constants';

export function integerLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = (+control.value).toFixed().length > maxLength;
    return forbidden ? { [Validation.ERRORS.FORBIDDEN_INTEGER_LENGTH]: true } : null;
  };
}

@Directive({
  selector: '[intrIntegerLength]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IntegerLengthValidatorDirective, multi: true }]
})
export class IntegerLengthValidatorDirective implements Validator {

  @Input('intrIntegerLength') maxLength = '';

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.maxLength ? integerLengthValidator(+this.maxLength)(control) : null;
  }
}
