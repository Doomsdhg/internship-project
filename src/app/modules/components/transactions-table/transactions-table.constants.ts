import { Column } from './transactions-table.interfaces';

export class Errors {

  static readonly FORBIDDEN_NAN_INPUT = 'forbiddenNanInput';
  static readonly FORBIDDEN_INTEGER_LENGTH = 'forbiddenIntegerLength';
}

export class Validation {

  static readonly ALLOWED_INTEGERS_LENGTH = 10;
  static readonly ALLOWED_LENGTH_AFTER_POINT = 2;
  static readonly ERRORS = Errors;
}

export class PossibleSortingDirections {

  static readonly ASC = 'asc';
  static readonly DESC = 'desc';
}

export class Columns {

  static readonly ID_EXTERNAL_ID = 'externalId';
  static readonly ID_PROVIDER = 'provider';
  static readonly ID_AMOUNT = 'amount';
  static readonly ID_COMMISSION_AMOUNT = 'commissionAmount';
  static readonly ID_USER = 'user';
  static readonly ID_ACTIONS = 'actions';
  static readonly ID_STATUS = 'status';
  static readonly NAME_EXTERNAL_ID = 'No.';
  static readonly NAME_PROVIDER = 'Provider';
  static readonly NAME_AMOUNT = 'Amount';
  static readonly NAME_COMMISSION_AMOUNT = 'commission amount';
  static readonly NAME_USER = 'user';
  static readonly NAME_ACTIONS = 'Actions';
  static readonly NAME_STATUS = 'Status';
  static readonly DISPLAYED_COLUMNS: string[] = [
    this.ID_EXTERNAL_ID,
    this.ID_PROVIDER,
    this.ID_STATUS,
    this.ID_AMOUNT,
    this.ID_COMMISSION_AMOUNT,
    this.ID_USER,
    this.ID_ACTIONS];
  static readonly COLUMNS_NAMES: Column[] = [
    {
      id: this.ID_EXTERNAL_ID,
      value: this.NAME_EXTERNAL_ID,
    },
    {
      id: this.ID_PROVIDER,
      value: this.NAME_PROVIDER,
    },
    {
      id: this.ID_STATUS,
      value: this.NAME_STATUS,
    },
    {
      id: this.ID_AMOUNT,
      value: this.NAME_AMOUNT,
    },
    {
      id: this.ID_COMMISSION_AMOUNT,
      value: this.NAME_COMMISSION_AMOUNT,
    },
    {
      id: this.ID_USER,
      value: this.NAME_USER,
    },
    {
      id: this.ID_ACTIONS,
      value: this.NAME_ACTIONS
    }];
}
