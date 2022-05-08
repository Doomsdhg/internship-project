import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { PageableDefaults } from "src/app/constants/pageable.constants";

//TODO: Naming files
export class GridState {
  query: string | string[] = [];
  resultsSize = PageableDefaults.resultsSize;
  pageEvent: PageEvent = new PageEvent();
  sortEvent: Sort = PageableDefaults.sortEvent as Sort;
  pageSizeOptions = PageableDefaults.pageSizeOptions;
}
