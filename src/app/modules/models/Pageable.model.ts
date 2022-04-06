import { GridState } from "./GridState.model";
import { Sortable } from "./Sortable.model";
import { QueryPredicates } from "./QueryPredicates.model";
import { PageableDefaults } from "src/app/constants/pageable.constants";

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

  constructor(q: QueryPredicates = new QueryPredicates(), page = PageableDefaults.pageNumber, size = PageableDefaults.defaultPageSize, sort: Sortable) {
    this.q = q;
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  toString() {
    return `?${this.q.toString()}&page=${this.page}&pageSize=${this.size}${this.sort.toString()}`;
  }
}