import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'homeFilter'
})
export class HomeFilterPipe implements PipeTransform {

    transform(names: any, searchValueComp: any, searchValueMerchent: any) {
        if (!searchValueComp.length && !searchValueMerchent.length) {
            return names;
        } else {
            const compNameAr = searchValueComp.map(res => res.nameAr);
            const compNameEn = searchValueComp.map(res => res.nameEn);
            const MerchentNameAr = searchValueMerchent.map(res => res.nameAr);
            const MerchentNameEn = searchValueMerchent.map(res => res.nameEn);
            return names.filter(name => {
                return compNameAr.includes(name.vendor.nameAr) ||
                    compNameEn?.includes(name.vendor.nameEn) ||
                    MerchentNameAr?.includes(name.merchantsInfo.nameAr) ||
                    MerchentNameEn?.includes(name.merchantsInfo.nameEn)
            });
        }

    }
}
