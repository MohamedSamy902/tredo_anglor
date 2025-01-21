import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  /* addCompany(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/'+ 'companies', data);
  } */
  addVendor(data, id: string): Observable<any> {
    if (!data.vendorZones[1]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 1);
    } else if (!data.vendorZones[2]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 2);
    } else if (!data.vendorZones[3]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 3);
    }

    if(data.vendorZones[0].vendorInfoId !== 0) {
      data.vendorZones.forEach((element, index) => {
        data.vendorZones[index].vendorInfoId = data.vendorZones[0].vendorInfoId
      });
    }
    data.id = id;
    return this.http.post(
      `${environment.baseAPIURL}/Vendor/PostVendorInfo`,
      data
    );
  }

  getAllVendors(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfo`);
  }
  GetVendorsInfoLite(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfoLite`);
  }

  getAllCities(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/GeoData/GetCities`);
  }

  getCityById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/GeoData/GetCity/${id}`);
  }

  deleteCity(id: string) {
    return this.http.delete(
      `${environment.baseAPIURL}/GeoData/DeleteCity/${id}`
    );
  }

  getOrdersShip() {
    return this.http.get(`${environment.baseAPIURL}/Order/GetOrdersShip`);
  }

  addCity(data, id: string) {
    data.id = id;
    return this.http.post(`${environment.baseAPIURL}/GeoData/PostCity`, data);
  }

  getGetRegions(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/GeoData/GetRegions`);
  }

  getVendorById(id: string): Observable<any> {
    return this.http.get(
      `${environment.baseAPIURL}/Vendor/GetVendorInfo/${id}`
    );
  }

  deleteVendorById(id: string) {
    return this.http.delete(
      `${environment.baseAPIURL}/Vendor/DeleteVendorInfo/${id}`
    );
  }

  // Interceptor Auth
  getAuthToken() {}
  refreshAuthToken(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}`);
  }

  GetOrderStatistics(actionPeriod: number) {
    return this.http.get(
      `${environment.baseAPIURL}/order/actionPeriod/${actionPeriod}/GetOrderStatistics`
    );
  }

  GetOrdersByActionPeriodAndStatus(actionPeriod: number, status: any) {
    return this.http.get(
      `${environment.baseAPIURL}/Order/GetOrdersShipByActionStatus/${actionPeriod}/${status}`
    );
  }

  getDashboard() {
    return this.http.get(`${environment.baseAPIURL}/Dash/AdminState`);
  }
  GetSystemSummary() {
    return this.http.get(`${environment.baseAPIURL}/Financial/GetSystemSummary`);
  }
}
