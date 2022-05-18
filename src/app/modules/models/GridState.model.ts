import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Constants } from 'src/app/constants/constants';

export class GridState {
  query: string | string[] = [];
  pageEvent: PageEvent = new PageEvent();
  sortEvent: Sort = Constants.PAGEABLE_DEFAULTS.SORT_EVENT;
  pageSizeOptions = Constants.PAGEABLE_DEFAULTS.PAGE_SIZE_OPTIONS;
}
