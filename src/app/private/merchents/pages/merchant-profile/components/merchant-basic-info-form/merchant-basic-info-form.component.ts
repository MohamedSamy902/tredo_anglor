import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-merchant-basic-info-form',
  templateUrl: './merchant-basic-info-form.component.html',
  styleUrls: ['./merchant-basic-info-form.component.scss']
})
export class MerchantBasicInfoFormComponent implements OnInit, OnChanges {
  userdData=this.Auth.GetLoginUser();
  @Input() merchantCategoriesData: any[];
  @Input() MerchantData: any
  public merchantBasicInfoForm: FormGroup;
  public isSubmited: boolean;
  userInfo: any;

  constructor(private _FB: FormBuilder, private Auth :AuthService, private authService: AuthService ) {
    this.initMerchantBasicInfoForm();
    this.merchantBasicInfoForm.controls['email']?.setValue(this.userdData?.email);
    this.merchantBasicInfoForm.controls['userName']?.setValue(this.userdData?.userName);
  }

  ngOnInit(): void {
    this.userInfo = this.authService.GetLoginUser();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.merchantBasicInfoForm.patchValue(this.MerchantData)
    this.merchantBasicInfoForm.patchValue({
      iBAN: this.MerchantData?.iban
    });
  }

  public initMerchantBasicInfoForm() {
    this.merchantBasicInfoForm = this._FB.group({
      nameAr: [, Validators.required],
      userName: [, Validators.required],
      nameComercial: ['', Validators.required],
      nameEn: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceCode: ['', Validators.required],
      filesCount: ['', Validators.required],
      pCode: [''],
      officialName: ['', Validators.required],
      commercialName: ['', Validators.required],
      comFileNo: ['', Validators.required],
      taxFileNo: ['', Validators.required],
      bankName: ['', Validators.required],
      iBAN: ['', Validators.required],
      status: ['', Validators.required],
      pictureRow: [null],
      merchantCategoryId: [null, Validators.required]
    });
  }

  public onChooseMerchantImage(event: any) {
    this.merchantBasicInfoForm.get('pictureRow')?.setValue(event);
  }
}
