import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  /**
   *
   * @param amount
   * @param description
   * @param orderId
   * @param merchantId
   * @returns
   */
  createTransAction(
    amount,
    description,
    orderId,
    merchantId
  ): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${environment.baseAPIURL}/Financial/CreateTransaction`,
      {
        amount: amount,
        description: description,
        orderId: orderId,
        merchantId: merchantId,
      }
    );
  }

  /**
   * @param amount
   * @param id
   * @param toke
   */
  updateSuccessTransaction(amount, id, token) {
    return this.http.post(
      `${environment.baseAPIURL}/Financial/UpdateSuccessTransaction`,
      {
        token: token,
        id: id,
        amount: amount,
      }
    );
  }
}
