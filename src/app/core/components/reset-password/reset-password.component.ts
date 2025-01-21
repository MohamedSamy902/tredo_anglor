import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { PasswordCustomValidators } from '../../CustomValidators/password-custom-validators';
import { ResetPasswordModel } from '../../models/RegisterModel';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup = new FormGroup({});
  email: string = '';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.resetForm = new FormGroup({
      Password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      ConfirmPassword: new FormControl('', [Validators.required])
    },
      [PasswordCustomValidators.MatchValidator('Password', 'ConfirmPassword')]
    );
  }
  get passwordMatchError() {
    return (
      this.resetForm.getError('mismatch') &&
      this.resetForm.get('ConfirmPassword')?.touched
      && this.resetForm.get('ConfirmPassword')?.value.length > 0
    );
  }
  public validateControl = (controlName: string) => {
    return this.resetForm?.get(controlName)?.invalid && this.resetForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.resetForm?.get(controlName)?.hasError(errorName)
  }
  public ResetPassword = (registerFormValue) => {
    const formValues = { ...registerFormValue };
    const user: ResetPasswordModel = {
      Email: this.email,
      Password: formValues.Password,
      ConfirmPassword: formValues.ConfirmPassword,
    }
    this.authService.ResetPassword(user)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          // this.errorMessage = err.error;
          // this.showError = true;
        }
      })
  }

}
