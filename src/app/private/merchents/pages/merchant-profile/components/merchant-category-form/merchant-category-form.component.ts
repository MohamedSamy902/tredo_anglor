import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-category-form',
  templateUrl: './merchant-category-form.component.html',
  styleUrls: ['./merchant-category-form.component.scss']
})
export class MerchantCategoryFormComponent implements OnInit {

  public merchantCategoryForm: FormGroup;
  public isSubmited: boolean;

  constructor(private _FB: FormBuilder) {
    this.initMerchantCategoryForm();
  }

  ngOnInit(): void {
  }

  public initMerchantCategoryForm() {
    this.merchantCategoryForm = this._FB.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required],
      MaxOrderPerDay: [0, Validators.required],
      AllowCredit: [false, Validators.required],
      MaxUsers: [0, Validators.required],
    });
  }
}
