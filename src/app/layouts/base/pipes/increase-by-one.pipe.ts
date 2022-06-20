import { Pipe, PipeTransform } from '@angular/core';

// this pipe returns number that you passed in incremented by one
// if nothing was passed, returns 1

@Pipe({
  name: 'intrIncreaseByOne'
})
export class IncreaseByOnePipe implements PipeTransform {

  transform(value?: number): unknown {
    return Number(value) + 1;
  }

}
