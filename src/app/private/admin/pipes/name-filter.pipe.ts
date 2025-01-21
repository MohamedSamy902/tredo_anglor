import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(names: any, searchValue: string, cities: any) {
    if(!searchValue) {
      return names;
    }
    return cities.filter(name => {
      return name.nameAr.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      name.nameEn.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    });
  }

}
