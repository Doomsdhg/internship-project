import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validation } from '../layouts/base/pages/components/transactions-table/transactions-table.constants';

export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const forbidden = isNaN(+control.value);
    return forbidden ? { [Validation.ERRORS.FORBIDDEN_NAN_INPUT]: true } : [];
  };
}

// This validator allows only numeric values to be written in input
