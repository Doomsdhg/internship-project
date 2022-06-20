import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intrIncreaseByOne'
})
export class IncreaseByOnePipe implements PipeTransform {

  transform(value: number): unknown {
    return value + 1;
  }

}
