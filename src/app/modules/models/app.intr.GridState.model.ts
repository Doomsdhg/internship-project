import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Constants } from 'src/app/constants/main.constants';

export class GridState {
  query: string | string[] = [];
  resultsSize = Constants.PAGEABLE_DEFAULTS.resultsSize;
  pageEvent: PageEvent = new PageEvent();
  sortEvent: Sort = Constants.PAGEABLE_DEFAULTS.sortEvent as Sort;
  pageSizeOptions = Constants.PAGEABLE_DEFAULTS.pageSizeOptions;
}
