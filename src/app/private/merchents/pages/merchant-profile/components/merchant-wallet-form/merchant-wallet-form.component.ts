import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-wallet-form',
  templateUrl: './merchant-wallet-form.component.html',
  styleUrls: ['./merchant-wallet-form.component.scss']
})
export class MerchantWalletFormComponent implements OnInit {

  public merchantWalletForm: FormGroup;
  public isSubmited: boolean;

  constructor(private _FB: FormBuilder) {
    this.initMerchantWalletForm();
  }

  ngOnInit(): void {
  }

  public initMerchantWalletForm() {
    this.merchantWalletForm = this._FB.group({
      balance: [0, Validators.required],
      status: [1, Validators.required],
      refCode: ['', Validators.required],
      allowCredit: [false, Validators.required],
      lastOperationDate: ['', Validators.required],
      walletTransactions: this._FB.array([]),
    });
  }
}
