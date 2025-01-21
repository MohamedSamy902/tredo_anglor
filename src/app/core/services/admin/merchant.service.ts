import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MerchantService {
    constructor(private http: HttpClient) { }

    getAllMerchant(): Observable<any> {
        return this.http.get(`${environment.baseAPIURL}/Merchant/GetMerchantsInfo`);
    }

    getMerchantById(id: string): Observable<any> {
        return this.http.get(`${environment.baseAPIURL}/Merchant/GetMerchantInfo/${id}`);
    }

    deleteMerchanById(id) {
        return this.http.delete(`${environment.baseAPIURL}/Merchant/DeleteMerchantInfo/${id}`);
    }
}
