import { GridState } from './app.intr.GridState.model';
import { Sortable } from './app.intr.Sortable.model';
import { QueryPredicates } from './app.intr.QueryPredicates.model';
import { Constants } from 'src/app/constants/main.constants';

export class Pageable {

  static fromState(state: GridState): Pageable {
    return new Pageable(
      QueryPredicates.fromState(state),
      state.pageEvent.pageIndex,
      state.pageEvent.pageSize,
      Sortable.fromState(state)
    );
  }

  q: QueryPredicates;
  page: number;
  size: number;
  sort: Sortable;

  constructor(
    q: QueryPredicates = new QueryPredicates(),
    page = Constants.PAGEABLE_DEFAULTS.pageNumber,
    size = Constants.PAGEABLE_DEFAULTS.defaultPageSize,
    sort: Sortable) {
    this.q = q;
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  toString(): string {
    return `?${this.q.toString() + '&'}page=${this.page}&pageSize=${this.size}${this.sort.toString()}`;
  }
}
