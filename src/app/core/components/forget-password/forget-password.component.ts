import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm?.get(controlName)?.invalid && this.forgotPasswordForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm?.get(controlName)?.hasError(errorName)
  }
  public SendOtp = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const email = forgotPass.email;
    this.authService.SendOtp(email)
      .subscribe({
        next: (_) => {
          this.showSuccess = true;
          this.successMessage = 'The link has been sent, please check your email to reset your password.'
          this.router.navigate(['auth/otp', email,], { queryParams: { page: 'forgetpassword' } });
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
        }
      })
  }
}
