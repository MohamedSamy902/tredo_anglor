import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-platform-subscription-form',
  templateUrl: './merchant-platform-subscription-form.component.html',
  styleUrls: ['./merchant-platform-subscription-form.component.scss']
})
export class MerchantPlatformSubscriptionFormComponent implements OnInit {


  public isSubmited: boolean;
  public merchantPlatformForm: FormGroup = this._FB.group({
    platformMerchantSubscriptions: this._FB.array([])
  });

  constructor(private _FB: FormBuilder) { }

  ngOnInit(): void {
    this.merchantPlatformControls.push(this.createmerchantPlatformFormGroup());
  }

  get merchantPlatformControls(): FormArray {
    return this.merchantPlatformForm.get('platformMerchantSubscriptions') as FormArray;
  }

  public createmerchantPlatformFormGroup() {
    return this._FB.group({
      subscriptionDate: ['', Validators.required],
      isAllowed: ['', Validators.required],
      merchantCode: ['', Validators.required],
      merchantId: '',
      merchantToken: ''
    });
  }

  public addNewmerchantPlatformFormGroup() {
    this.merchantPlatformControls.push(this.createmerchantPlatformFormGroup());
  }

  public deletemerchantPlatformFormGroup(index: number) {
    this.merchantPlatformControls.removeAt(index);
  }
}
