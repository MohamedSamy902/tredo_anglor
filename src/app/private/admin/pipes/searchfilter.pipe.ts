import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(companies: any, searchValue: string, allData: any) {
    if (!searchValue) {
      return companies;
    }
    return allData.filter(company => company.nameAr?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
