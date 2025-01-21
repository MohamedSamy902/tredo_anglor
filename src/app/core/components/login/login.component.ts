import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { AuthResponseDto } from '../../models/AuthResponseDto';
import { LoginModel } from '../../models/LoginModel';
import { MerchentsService } from 'src/app/private/merchents/services/merchents.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private returnUrl: string;

  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _MerchentsService: MerchentsService,

  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      remeberMe: new FormControl(''),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  validateControl = (controlName: string) => {
    return (
      this.loginForm?.get(controlName)?.invalid &&
      this.loginForm?.get(controlName)?.touched
    );
  };
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm?.get(controlName)?.hasError(errorName);
  };

  loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: LoginModel = {
      Username: login.Username,
      Password: login.Password
    }
    this.authService.Login(userForAuth).subscribe({
      next: (res: AuthResponseDto) => {
    localStorage.removeItem('storedProp');
    localStorage.setItem('token', res.token);
        localStorage.setItem('logUserInfo', JSON.stringify(res.user));
        if (res.user.userType == 1) {
          this.router.navigate(['admin']);
        } else {

          this._MerchentsService.getCuurentMerchantInfo(res.user.merchentId)
          this.router.navigate(['merchents']);

        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = "خطا اثناء الدخول";
        this.showError = true;
      },
    });
  };
}
