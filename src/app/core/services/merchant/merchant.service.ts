import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpClient) { }

  GetOrderStatisticsByMerchantId(actionPeriod: number, merchantId: number) {
    return this.http.get(`${environment.baseAPIURL}/order/actionPeriod/${actionPeriod}/merchant/${merchantId}/GetOrderStatistics`);
  }

  getAllMerchant(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Merchant/GetMerchantsInfo`);
}

}
