import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MerchantBasicInfoFormComponent } from '../merchant-basic-info-form/merchant-basic-info-form.component';
import { MerchantPlatformSubscriptionFormComponent } from '../merchant-platform-subscription-form/merchant-platform-subscription-form.component';
import { MerchantWarehouseFormComponent } from '../merchant-warehouse-form/merchant-warehouse-form.component';

@Component({
  selector: 'app-merchant-info-form-container',
  templateUrl: './merchant-info-form-container.component.html',
  styleUrls: ['./merchant-info-form-container.component.scss']
})
export class MerchantInfoFormContainerComponent implements OnInit {

  @Output() onSubmitMerchantInfoForm: EventEmitter<any> = new EventEmitter();

  @ViewChild(MerchantBasicInfoFormComponent) basicInfoFormComponent: MerchantBasicInfoFormComponent;
  @ViewChild(MerchantWarehouseFormComponent) warehouseFormComponent: MerchantWarehouseFormComponent;
   @ViewChild(MerchantPlatformSubscriptionFormComponent) platformSubscriptionFormComponent: MerchantPlatformSubscriptionFormComponent;

  @Input() merchantCategoriesData: any[];
  @Input() MerchantData: any;

  public merchantInfoData: any = {};
  public disabledFormBtn: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  get basicInfoData() {
    return this.basicInfoFormComponent?.merchantBasicInfoForm;
  }

  get warehouseInfo() {
    return this.warehouseFormComponent?.merchantWarehouseForm;
  }

  get platformData() {
    return this.platformSubscriptionFormComponent?.merchantPlatformForm;
  }

  public postMerchantInfoData() {
    this.merchantInfoData = { ...this.basicInfoData?.value, ...this.warehouseInfo?.value,...this.platformData?.value };
    // this.onSubmitMerchantInfoForm.emit(this.merchantInfoData);
    console.log(this.merchantInfoData);
  }
}
