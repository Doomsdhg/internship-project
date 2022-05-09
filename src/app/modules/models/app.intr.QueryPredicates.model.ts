import { GridState } from './app.intr.GridState.model';

export class QueryPredicates {

  static fromState(state: GridState): QueryPredicates {
    return new QueryPredicates(state.query);
  }

  predicates: string[] = [];

  constructor(query: string | string[] = []) {
    if (typeof query === 'string') {
      this.predicates = [query];
    } else {
      this.predicates = [...query];
    }
  }

  toString(): string {
    return this.predicates
      .map((predicate) => predicate)
      .join('&');
  }
}
