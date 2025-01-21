import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { SharingDataAppService } from 'src/app/core/services/SharingDataApp.service';
import { merchantsInfo } from 'src/app/core/models/MerchantsInfo';

@Injectable({
  providedIn: 'root'
})
export class MerchentsService {

  private _APIURL = environment.baseAPIURL;
  public _OffersDTO: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private SDA:SharingDataAppService) { }

  public getCuurentMerchantInfo(merchantId: number) {
     this.http.get<merchantsInfo>(`${this._APIURL}/Merchant/GetMerchantInfo/${merchantId}`).subscribe(res=>{
      this.SDA.SetUserMetaData(res as merchantsInfo);
    });
  }
  public getMerchantInfo(merchantId: number) {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantInfo/${merchantId}`);
  }
  public GetMerchantsInfoLite() {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantsInfoLite`);
  }

  public getOrderShip() {
    return this.http.get(`${this._APIURL}/Order/GetOrdersShip`);
  }

  public getMerchentOrders(merchantId: number) {
    return this.http.get(`${this._APIURL}/Order/GetMerchentOrders/${merchantId}`);
  }

  public getPreOrderById(orderID: number) {
    return this.http.get(`${this._APIURL}/Order/GetPreOrder/${orderID}`);
  }

  public updatePreOrderByID(orderData: any, orderID: number) {
    return this.http.post<any>(`${this._APIURL}/Order/PostPreOrder/${orderID}`, orderData);
  }

  public createNewPreOrder(orderData: any) {
    return this.http.post<any>(`${this._APIURL}/Order/PostPreOrder`, orderData);
  }

  public deletePreOrder(orderID: number) {
    return this.http.delete(`${this._APIURL}/Order/DeletePreOrder/${orderID}`);
  }

  public getCities() {
    return this.http.get(`${this._APIURL}/GeoData/GetCities`);
  }

  public getMerchantWarehouses(merchantId: number) {
    return this.http.get(`${this._APIURL}/Merchant/GetMerchantWarehouses/${merchantId}`);
  }

  public postOfferList(offerListData: any) {
    return this.http.post(`${this._APIURL}/Order/GetOfferList`, offerListData);
  }

  public postOrderSubmition(data: any) {
    return this.http.post(`${this._APIURL}/Operations/orderSubmition`, data);
  }

  public getMerchantWalletDetails(merchantId: number) {
    return this.http.get(`${this._APIURL}/Reporting/GetMerchantWalletDetails/${merchantId}`);
  }
  public CancelOrder(Id: number) {
    return this.http.get(`${this._APIURL}/Operations/CancelOrder/${Id}`);
  }

  public TrackOrder(Id: number) {
    return this.http.get(`${this._APIURL}/Operations/TrackOrder/${Id}`);
  }
  public TrackOrderWithAction(Id: number) {
    return this.http.get(`${this._APIURL}/Operations/TrackOrderWithAction/${Id}`);
  }
}
