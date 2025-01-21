import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchant-warehouse-form',
  templateUrl: './merchant-warehouse-form.component.html',
  styleUrls: ['./merchant-warehouse-form.component.scss']
})
export class MerchantWarehouseFormComponent implements OnInit, OnChanges {
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter();
  @Input() MerchantWarehouses: any;
  @Input() openAddWarehouseDialog: boolean;


  public map: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';
  public lat = 37.75;
  public lng = -122.41;

  public isSubmited: boolean;
  public merchantWarehouseForm: FormGroup = this._FB.group({
    merchantWarehouses: this._FB.array([])
  });

  constructor(private _FB: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.MerchantWarehouses?.forEach((element, index) => {
      this.merchantWarehouseControls['controls'][index]?.patchValue(element)
    });
  }

  ngOnInit(): void {
    this.merchantWarehouseControls.push(this.createMerchantWareHouseFormGroup());

  }

  get merchantWarehouseControls(): FormArray {
    return this.merchantWarehouseForm.get('merchantWarehouses') as FormArray;
  }

  public createMerchantWareHouseFormGroup() {
    return this._FB.group({
      nameTag: ['', Validators.required],
      postalCode: ['', Validators.required],
      provinceId: [0, Validators.required],
      districtID: [0, Validators.required],
      shortcutAddress: ['', Validators.required],
      buildingNumber: ['', Validators.required],
      street: ['', Validators.required],
      additionalNumber: ['', Validators.required],
      unitNumber: ['', Validators.required],
      unitfloor: ['', Validators.required],
      locationPoint: ['', Validators.required],
    });
  }

  public addNewMerchantWarehouseFormGroup() {
    this.merchantWarehouseControls.push(this.createMerchantWareHouseFormGroup());
  }

  public deleteMerchantWarehouseFormGroup(index: number) {
    this.merchantWarehouseControls.removeAt(index);
  }
}
