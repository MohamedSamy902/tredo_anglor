import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantProfileService {

  private _APIURL = environment?.baseAPIURL;

  constructor(private http: HttpClient) { }

  public getMerchantCategories() {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantCategories`);
  }

  public getMerchantInfo(merchantId: number) {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantInfo/${merchantId}`);
  }

  public postMerchantInfo(mercahntInfoData: any) {
    return this.http.post(`${this._APIURL}/Merchant/PostMerchantInfo`, mercahntInfoData);
  }

  public getMerchantWarehouses(merchantId: number) {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantWarehouses/${merchantId}`);
  }

  public postMerchantWarehouse(warehouseData: any) {
    return this.http.post(`${this._APIURL}/Merchant/PostMerchantWarehouse`, warehouseData);
  }

  public deleteWarehouse(warehouseId: number) {
    return this.http.delete(`${this._APIURL}/Merchant/DeleteMerchantWarehouse/${warehouseId}`);
  }

  public getPlatformsData() {
    return this.http.get(`${this._APIURL}/Merchant/GetPlatformsInfos`);
  }

  public getMerchantPlatformsData() {
    return this.http.get(`${this._APIURL}/Merchant/GetPlatformMerchantSubscriptions`);
  }

  public addMerchantPlatform(platformData: any) {
    return this.http.post(`${this._APIURL}/Merchant/PostPlatformMerchantSubscription`, platformData);
  }
}
