import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customZero',
  pure: false
})
export class CustomZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
      return (value < 10) ? "0" + value : + value

  }

}
