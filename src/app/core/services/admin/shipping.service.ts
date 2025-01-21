import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShippingService {
    constructor(private http: HttpClient) { }

    getAllShipping(): Observable<any> {
        return this.http.get(`${environment.baseAPIURL}/Shipping/GetShippingTypes`);
    }

    getShippingById(id: string): Observable<any> {
        return this.http.get(`${environment.baseAPIURL}/Shipping/GetShippingType/${id}`);
    }

    getOrderById(id: string): Observable<any> {
        return this.http.get(`${environment.baseAPIURL}/Order/GetOrderShip/${id}`);
    }

    deleteShippingById(id) {
        return this.http.delete(`${environment.baseAPIURL}/Shipping/DeleteShippingType/${id}`);
    }

    addshipping(data, id) {
        data.id = id;
        return this.http.post(`${environment.baseAPIURL}/Shipping/PostShippingType`, data);
    }
}
