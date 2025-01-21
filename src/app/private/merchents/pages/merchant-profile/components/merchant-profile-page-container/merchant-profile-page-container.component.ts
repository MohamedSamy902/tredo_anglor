import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-merchant-profile-page-container',
  templateUrl: './merchant-profile-page-container.component.html',
  styleUrls: ['./merchant-profile-page-container.component.scss']
})
export class MerchantProfilePageContainerComponent implements OnInit {

  @Output() onSubmitMerchantInfoForm: EventEmitter<any> = new EventEmitter();
  @Input() merchantCategoriesData: any[];
  @Input() MerchantData: any;
  constructor() { }

  ngOnInit(): void {
  }

}
