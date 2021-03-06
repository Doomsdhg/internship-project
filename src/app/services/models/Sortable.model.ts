import { GridState } from './GridState.model';

export class Sortable {

  static fromState(state: GridState): Sortable {
    return new Sortable(state.sortEvent.active, state.sortEvent.direction);
  }

  field: string;
  direction: string;

  constructor(field: string, direction: string) {
    this.field = field;
    this.direction = direction;
  }

  toString(): string {
    if (this.direction && this.direction.length) {
      return `&sort=${this.field}&order=${this.direction.toUpperCase()}`;
    }
    // skip sorting if no direction passed
    return '';
  }
}
