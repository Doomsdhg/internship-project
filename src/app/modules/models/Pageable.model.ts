import { Constants } from 'src/app/constants/constants';
import { GridState } from './GridState.model';
import { QueryPredicates } from './QueryPredicates.model';
import { Sortable } from './Sortable.model';

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
    page = Constants.PAGEABLE_DEFAULTS.PAGE_NUMBER,
    size = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE,
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
