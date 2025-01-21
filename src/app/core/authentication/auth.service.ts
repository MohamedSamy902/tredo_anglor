import { Injectable } from '@angular/core';
import { Subject } from '@microsoft/signalr';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseDto } from '../models/AuthResponseDto';
import { LoginModel } from '../models/LoginModel';
import { OtpModel } from '../models/OtpModel';
import { RegisterModel, ResetPasswordModel } from '../models/RegisterModel';
import { ApiService } from '../services/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  merchantData$ = new Subject();
  ResetPassword(user: ResetPasswordModel) {
    return this.apiService.post<Response>('/Authenticate/reset-password', user);
  }
  constructor(private apiService: ApiService) {}

  Register(registerObj: RegisterModel): Observable<Response> {
    return this.apiService.post<Response>(
      '/Authenticate/register',
      registerObj
    );
  }
  AddUserFromAdmin(registerObj): Observable<Response> {
    return this.apiService.post<Response>(
      '/Authenticate/add-user-from-admin',
      registerObj
    );
  }
  updateUserFromAdmin(registerObj): Observable<Response> {
    return this.apiService.post<Response>(
      '/Authenticate/update-user-info',
      registerObj
    );
  }
  Login(loginObj: LoginModel): Observable<AuthResponseDto> {
    return this.apiService.post<AuthResponseDto>(
      '/Authenticate/login',
      loginObj
    );
  }
  VerifyWithOtp(email: string, otp: string): Observable<Response> {
    let model: OtpModel = { Otp: otp, Email: email };
    return this.apiService.post<Response>(
      '/Authenticate/ConfirmEmailOTP',
      model
    );
  }
  SendOtp(email: string): Observable<Response> {
    return this.apiService.get<Response>('/Authenticate/send-otp/' + email);
  }
  IsLoggedIn() {
    return !!localStorage.getItem('token');
  }
  GetLoginUser() {
    return JSON.parse(localStorage?.getItem('logUserInfo')!);
  }
  GetRoles() {
    return JSON.parse(localStorage?.getItem("logUserInfo")!).userRoles;
  }
  getMerchantData(id) {
    return this.apiService.getMerchantData(id).pipe(
      map((res) => {
        this.merchantData$.next(res);
        return res
      })
    );
  }
}
