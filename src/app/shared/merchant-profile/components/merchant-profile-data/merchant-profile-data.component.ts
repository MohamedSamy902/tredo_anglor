import { MerchentsService } from './../../../../private/merchents/services/merchents.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MerchantProfileService } from 'src/app/private/merchents/pages/merchant-profile/services/merchant-profile.service';
import { ActivatedRoute } from '@angular/router';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { RulerControl, StylesControl } from 'mapbox-gl-controls';


@Component({
  selector: 'app-merchant-profile-data',
  templateUrl: './merchant-profile-data.component.html',
  styleUrls: ['./merchant-profile-data.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MerchantProfileDataComponent implements OnInit {

  @Input() isAdminMode: boolean;

  public merchantInfoForm: FormGroup;
  public merchantCategoriesData: any;
  public merchantWarehousesData: any[];
  public openAddWarehouseDialog: boolean = false;
  public isSubmited: boolean;
  public merchantInfo: any;
  public id: any;
  public merchantStatusList = [
    { name: 'Pending', value: 0 },
    { name: 'Approved', value: 1 },
    { name: 'TotalPaused', value: 2 },
    { name: 'PartialPasused', value: 3 },
    { name: 'Suspended', value: 100 }
  ];
  public citiesData: any[];

  marker;
  map: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/streets-v11';
  public lat = 24.7658673;
  public lng = 46.6433869;

  public merchantPlatformsData: any[];
  public platformsData: any[];
  public openAddPlatformDialog: boolean;

  public merchantPlatformForm: FormGroup = this._FB.group({
    platformsInfoId: ['', Validators.required],
    merchantToken: ['', Validators.required],
    merchantCode: ['', Validators.required],
  });

  public warehousesLoading: boolean;
  public createwarehouseLoading: boolean;
  public merchantWarehouseForm: FormGroup = this._FB.group({
    id: [0, Validators.required],
    nameTag: ['', Validators.required],
    //postalCode: ['', Validators.required],
    provinceId: [0, Validators.required],
    //districtID: [0, Validators.required],
    //shortcutAddress: ['', Validators.required],
    //buildingNumber: ['', Validators.required],
    street: ['', Validators.required],
    additionalNumber: ['', Validators.required],
    //unitNumber: ['', Validators.required],
    //unitfloor: ['', Validators.required],
    locationPoint: ['', Validators.required],
    isWorking: [true, Validators.required],
  });

  constructor(
    private _MerchantProfileService: MerchantProfileService,
    private _FB: FormBuilder,
    private _MerchentsService: MerchentsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {
    this._InitMerchantInfoForm();
   // this.getMerchantWarehouses();
   // this.getMerchantPlatformsData();

  }

  ngOnInit(): void {
    if (this.isAdminMode) {
      this.route.params.subscribe(res => {
        if (res['id']) {
          this.getMerchantInfo(res['id']);
        }
      });
    } else {
      this.getMerchantInfo(this.userInfo?.merchentId);
    }
    this.getMerchantCategories();
    this.getPlatformsData();
    this.getCitiesData();
  }

  public showWarehouseDialog() {
    this.openAddWarehouseDialog = true;

    setTimeout(() => {
      mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'warehouseMap',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat],

      });
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.on(('click'), (e) => {
        this.lat = e.lngLat.lat;
        this.lng = e.lngLat.lng;
        this.merchantWarehouseForm.get('locationPoint')?.setValue(`${this.lat}, ${this.lng}`);
        const coord = [e.lngLat.lng, e.lngLat.lat];
        this.addmarker(coord);
      });
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
        })
      );
      this.map.addControl(new RulerControl(), 'top-right');

      if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
        mapboxgl.setRTLTextPlugin(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
          null,
          true // Lazy load the plugin
        );
      }
      var mapboxLanguage = new MapboxLanguage({
        defaultLanguage: 'ar'
      });
      this.map.addControl(mapboxLanguage);

    }, 1000);
  }

  private _InitMerchantInfoForm() {
    this.merchantInfoForm = this._FB.group({
      id: [0, Validators.required],
      nameAr: ['', Validators.required],
      userName: [''],
      nameComercial: [''],
      nameEn: [''],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceCode: [''],
      filesCount: [''],
      pCode: [''],
      // officialName: ['', Validators.required],
      //  commercialName: ['', Validators.required],
      comFileNo: [''],
      taxFileNo: [''],
      bankName: [''],
      iban: [''],
      status: [''],
      pictureRow: null,
      merchantCategoryId: ['']
    });
  }

  private getMerchantInfo(merchantId: number) {
    this._MerchantProfileService.getMerchantInfo(merchantId).subscribe({
      next: (res: any) => {
        this.merchantInfo = res;
        this.merchantInfoForm.patchValue(res);
        this.merchantWarehousesData = res.merchantWarehouses;
        this.merchantPlatformsData = res.platformMerchantSubscriptions;
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  public getMerchantCategories() {
    this._MerchantProfileService.getMerchantCategories().subscribe({
      next: (res: any) => {
        this.merchantCategoriesData = res;
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  private getCitiesData() {
    this._MerchentsService.getCities().subscribe({
      next: (res: any) => {
        this.citiesData = res;
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }


  public postMerchantInfoData() {
    this.isSubmited = true;
    const merchantInfoData = this.merchantInfoForm?.value;
    if (this.id) merchantInfoData.id = this.id;
    this._MerchantProfileService.postMerchantInfo(merchantInfoData).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', detail: 'تم الحفظ بنجاج.' });
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', detail: 'حدث خطأ ما! برجاء المحاولة مرة اخري.' });

       },

      complete: () => {
        this.ngOnInit();
      }
    });
  }

  public onChooseMerchantImage(event: any) {
    this.merchantInfoForm.get('pictureRow')?.setValue(event);
  }

  private getMerchantWarehouses() {
    this.warehousesLoading = true;
    this._MerchantProfileService.getMerchantWarehouses(this.userInfo?.merchentId).subscribe({
      next: (res: any) => {
        this.merchantWarehousesData = res;
      },
      error: (err: any) => {
        this.warehousesLoading = false;
      },
      complete: () => {
        this.warehousesLoading = false;
      }
    });
  }

  get userInfo() {
    return JSON.parse(localStorage.getItem('logUserInfo')!);
  }

  public postMerchantWarehouse() {
    this.createwarehouseLoading = true;
    const warehouseData = this.merchantWarehouseForm.value;
    warehouseData.merchantsInfoId = this.merchantInfo.id;// this.userInfo?.merchentId;
    this._MerchantProfileService.postMerchantWarehouse(warehouseData).subscribe({
      next: (res: any) => {
        this.createwarehouseLoading = false;
        this.messageService.add({ severity: 'success', detail: 'تم حفظ المستودع بنجاج.' });
      },
      error: (err: any) => {
        this.createwarehouseLoading = false;
        this.messageService.add({ severity: 'error', detail: 'حدث خطأ ما! برجاء المحاولة مرة اخري.' });
      },
      complete: () => {
        this.getMerchantWarehouses();
        this.openAddWarehouseDialog = false;
        this.merchantWarehouseForm.reset();
      }
    });
  }

  public editWarehouse(warehouse) {
    this.merchantWarehouseForm.patchValue(warehouse);
    this.showWarehouseDialog();
  }

  public deleteWarehouse(warehouse) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف هذا المستوع؟',
      accept: () => {
        this._MerchantProfileService.deleteWarehouse(warehouse.id).subscribe({
          next: (res: any) => {
            this.messageService.add({ severity: 'success', detail: 'تم حذف المستودع بنجاج.' });
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', detail: 'حدث خطأ ما! برجاء المحاولة مرة اخري.' });
          },
          complete: () => {
            this.getMerchantWarehouses();
          }
        });
      }
    });
  }
  addmarker(coord) {
    if (this.marker != null) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker({
      color: "#6499ff",
      draggable: true

    });
    this.marker.setLngLat(coord).addTo(this.map);
  }

  // private getMerchantPlatformsData() {
  //   this._MerchantProfileService.getMerchantPlatformsData().subscribe({
  //     next: (res: any) => {
  //       this.merchantPlatformsData = res;
  //     },
  //     error: (err: any) => {
  //     },
  //     complete: () => {
  //     }
  //   });
  //}

  private getPlatformsData() {
    this._MerchantProfileService.getPlatformsData().subscribe({
      next: (res: any) => {
        this.platformsData = res;
          console.log(this.platformsData);

      },
      error: (err: any) => {
      },
      complete: () => {
      }
    });
  }

  public showAddPlatformDialog() {
    this.openAddPlatformDialog = true;
  }

  public postMerchantPlatformData() {
    let platformData = this.merchantPlatformForm.value;
    platformData.MerchantsInfoId = this.merchantInfo.id// this.userInfo?.merchentId;
    this._MerchantProfileService.addMerchantPlatform(platformData).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', detail: 'تم إضافة المنصة بنجاج.' });
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', detail: 'حدث خطأ ما! برجاء المحاولة مرة اخري.' });
      },
      complete: () => {
        this.getMerchantInfo( this.merchantInfo.id);
        this.merchantPlatformForm.reset();
        this.openAddPlatformDialog = false;
      }
    });
  }
}
function Output() {
  throw new Error('Function not implemented.');
}

