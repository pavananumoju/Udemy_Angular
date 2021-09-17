import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, property: any): any {
    if(value.length === 0 || value === ''){
      return value;
    }
    // const sortedArray = [];
    return value.sort((a,b)=>{
      if(a[property] > b[property]) return 1;
      if(b[property] > a[property]) return -1;
      return 0;
    });
  }

}
