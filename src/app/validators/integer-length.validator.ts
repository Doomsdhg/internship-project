import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validation } from '../layouts/base/pages/components/transactions-table/transactions-table.constants';

export function maxIntegerLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = (+control.value).toFixed().length > maxLength;
    return forbidden ? { [Validation.ERRORS.FORBIDDEN_INTEGER_LENGTH]: true } : null;
  };
}

// This validator validates length of input integer number.
// Pass in one number, this number is supposed to be your wanted maximal allowed length of integer input
