import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { PasswordCustomValidators } from 'src/app/core/CustomValidators/password-custom-validators';
import { UserType } from 'src/app/core/Enums/user-type';
import { AdminBusinessService } from '../../services/admin-business.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-assign-permissions',
  templateUrl: './assign-permissions.component.html',
  styleUrls: ['./assign-permissions.component.scss'],
})
export class AssignPermissionsComponent implements OnInit {
  SelectedPermissions: any[] = [];
  checked: boolean = false;
  Id: string;
  user: any;
  assinPermissionForm: FormGroup;
  Permissions: any[] = [];
  isSubmited = false;
  allComplete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminBusinessService,
    private translate: TranslateService
  ) {}
  async ngOnInit(): Promise<void> {
    this.GetPermission();
    this.assinPermissionForm = this.fb.group(
      {
        Username: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
        ConfirmPassword: ['', [Validators.required]],
        Note: new FormControl(''),
        SelectedPermissions: this.fb.array([]),
      },
      [PasswordCustomValidators.MatchValidator('Password', 'ConfirmPassword')]
    );
    this.Id = this.route.snapshot.paramMap.get('Id')!;
    if (this.Id) {
      await this.GetUser();
      this.assinPermissionForm?.get('Password')?.clearValidators();
      this.assinPermissionForm?.get('ConfirmPassword')?.clearValidators();
      this.assinPermissionForm?.get('Password')?.updateValueAndValidity();
      this.assinPermissionForm
        ?.get('ConfirmPassword')
        ?.updateValueAndValidity();
    }
  }
  get passwordMatchError() {
    return (
      this.assinPermissionForm.getError('mismatch') &&
      this.assinPermissionForm.get('ConfirmPassword')?.touched &&
      this.assinPermissionForm.get('ConfirmPassword')?.value.length > 0
    );
  }
  public validateControl = (controlName: string) => {
    return (
      this.assinPermissionForm?.get(controlName)?.invalid &&
      this.assinPermissionForm?.get(controlName)?.touched
    );
  };
  public hasError = (controlName: string, errorName: string) => {
    return this.assinPermissionForm?.get(controlName)?.hasError(errorName);
  };

  GetPermission() {
    this.adminService.GetPermission().subscribe({
      next: (res: any) => {
        this.Permissions = res.permissions;
        //  this.router.navigate(['auth/otp',user.Email]);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {},
    });
  }
  public onSubmit = (registerFormValue) => {
    this.SelectedPermissions = this.Permissions;
    this.SelectedPermissions = this.Permissions.filter(
      (a) => a.isSelected == true
    ).map((a) => a.id);

    this.isSubmited = true;
    const formValues = { ...registerFormValue };
    let obj = {
      Username: formValues.Username,
      Email: formValues.Email,
      Password: formValues.Password,
      ConfirmPassword: formValues.ConfirmPassword,
      UserType: UserType.Admin,
      Permission: this.SelectedPermissions,
      Id: '',
    };
    if (this.Id) {
      obj.Id = this.Id;
      this.authService.updateUserFromAdmin(obj).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
          });
          this.router.navigate(['admin/all-users']);
        },
        error: (err: HttpErrorResponse) => {
          // this.errorMessage = err.error;
          // this.showError = true;
        },
      });
    } else {
      this.authService.AddUserFromAdmin(obj).subscribe({
        next: (res: any) => {
          this.router.navigate(['admin/all-users']);
        },
        error: (err: HttpErrorResponse) => {
          // this.errorMessage = err.error;
          // this.showError = true;
        },
      });
    }
  };

  GetUser() {
    this.adminService.GetUser(this.Id).subscribe((Result) => {
      this.user = Result.user;
      this.assinPermissionForm.controls['Username']?.setValue(
        this.user?.username
      );
      this.assinPermissionForm.controls['Email']?.setValue(this.user?.email);
      this.user.permission.forEach((element) => {
        this.Permissions.filter((a) => a.id == element)[0].isSelected = true;
      });
    });
  }
  public alertConfirmation = (registerFormValue) => {
    Swal.fire({
      title: this.translate.instant('Confirm.AreYouSure'),
      text: this.translate.instant('Confirm.SaveData'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('Confirm.Save'),
      cancelButtonText: this.translate.instant('Confirm.Cancle'),
    }).then((result) => {
      if (result.value) {
        this.onSubmit(registerFormValue);
        Swal.fire(
          this.translate.instant('Confirm.Save'),
          this.translate.instant('Confirm.SaveDataSuccessfuly'),
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  };
}
