import { GridState } from "./GridState.model";

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

  toString() {
    if (this.direction && this.direction.length) {
      return `&sort=${this.field},${this.direction}`;
    }

    // skip sorting if no direction passed
    return '';
  }
}