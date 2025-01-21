import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { PasswordCustomValidators } from '../../CustomValidators/password-custom-validators';
import { UserType } from '../../Enums/user-type';
import { RegisterModel } from '../../models/RegisterModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  errorMessage
  showError
   registerForm: FormGroup=new FormGroup({}) ;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      ConfirmPassword: new FormControl('', [Validators.required])
    },
      [PasswordCustomValidators.MatchValidator('Password', 'ConfirmPassword')]
    );
  }
  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('ConfirmPassword')?.touched
      && this.registerForm.get('ConfirmPassword')?.value.length > 0
    );
  }
  public validateControl = (controlName: string) => {
    return this.registerForm?.get(controlName)?.invalid && this.registerForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm?.get(controlName)?.hasError(errorName)
  }
  public registerUser = (registerFormValue) => {
    const formValues = { ...registerFormValue };
    const user: RegisterModel = {
      Username: formValues.Username,
      Email: formValues.Email,
      Password: formValues.Password,
      ConfirmPassword: formValues.ConfirmPassword,
      UserType: UserType.Merchant
    }
    this.authService.Register(user)
    .subscribe({
      next: (res:any) => {
       this.router.navigate(['auth/otp',user.Email]);
       this.showError = false;

    },
    error: (err: HttpErrorResponse) => {
       this.errorMessage = err.error.message;
       this.showError = true;
    }})
}
}
