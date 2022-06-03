import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validator } from '@angular/forms';
import { Validation } from '../layouts/base/pages/components/transactions-table/transactions-table.constants';

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = isNaN(+control.value);
    return forbidden ? { [Validation.ERRORS.FORBIDDEN_NAN_INPUT]: true } : null;
  };
}

@Directive({
  selector: '[intrNumbersOnly]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumbersOnlyValidatorDirective, multi: true }]
})
export class NumbersOnlyValidatorDirective implements Validator {

  public validate(control: AbstractControl): ValidationErrors | null {
    return numbersOnlyValidator()(control);
  }
}
