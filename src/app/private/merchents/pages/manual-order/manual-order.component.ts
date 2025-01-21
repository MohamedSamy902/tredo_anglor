import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchentsService } from '../../services/merchents.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ShippingService } from 'src/app/core/services/admin/shipping.service';
import { ActivatedRoute } from '@angular/router';
import { OrderingObserverService } from 'src/app/core/services/ordering-observer.service';
import { OrderingState } from 'src/app/core/models/Shared/ordering-state';

@Component({
  selector: 'app-manual-order',
  templateUrl: './manual-order.component.html',
  styleUrls: ['./manual-order.component.scss']
})
export class ManualOrderComponent implements OnInit {
  isSubmited = false;
  canRoute = false;
  manualOrdersForm: FormGroup;
  alert = '';
  mapModal = false;
  lat = 51.678418;
  lng = 7.809007;
  locationChoosen = false;
  public citiesData: any[];
  public warehousesData: any[];
  public shippingArray: any[] = [];
  public preorder:any;
  LocalOrderSatat: OrderingState;
  LocalofferRequestDTO;
  Pastable = false;
  constructor(private fb: FormBuilder, private _MerchentsService: MerchentsService,
    private shippingService: ShippingService,
    private router: Router,
    private route: ActivatedRoute,
    private orderstate:OrderingObserverService) { }

  ngOnInit(): void {
    this.initManualOrdersForm();
    this.getCitiesData();
    this.getMerchantWarehouses();
    this.route.params.subscribe(res => {
      if (res['sallaorder']) {
         let preorder = JSON.parse( res['sallaorder']);
         this.manualOrdersForm.patchValue({
          shipmentdescription: preorder.description,
        });
        this.reciverAddress.patchValue({
          name: preorder.dropOffName,
          phone: preorder.dropOffMobileNu,
          street :preorder.dropOffAddress,
          cityIdTo :this.findCityIdByName(preorder.dropOffCity)
        });
      }
    });

  }

  private initManualOrdersForm() {
    this.manualOrdersForm = this.fb.group({
      reciverAddress: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"),]],
        cityIdTo: [1, [Validators.required,]],
        email: '',
        street: ['', [Validators.required, Validators.minLength(3)]],
      }),
      shipmentType: ['', Validators.required],
      cod: [false],
      weight: ['0'],
      dimensions: ['0'],
      warehouseId: ['', Validators.required],
      cityIdFrom: [1, Validators.required],
      shipmentdescription: [''],
      orderRef: this.generateRandomString(),
      price: ['0']
    });
  this.orderstate.OrderingStateMeta$.subscribe(res=>{
      this.LocalOrderSatat = res;

      if(this.LocalOrderSatat.IsProcessing&&!this.LocalOrderSatat.IsProcessed&&this.LocalOrderSatat.IsManual &&
        this.LocalOrderSatat.RowManualOrder){
            this.LocalofferRequestDTO = this.LocalOrderSatat.RowManualOrder;
            if ( this.LocalofferRequestDTO) {
              this.manualOrdersForm.patchValue({
                shipmentdescription: this.LocalofferRequestDTO.shipmentdescription,
                warehouseId:this.LocalofferRequestDTO.warehouseId,
                cityIdFrom:this.LocalofferRequestDTO.cityIdFrom,
                cod:this.LocalofferRequestDTO.cod,
                price:this.LocalofferRequestDTO.price,
                orderRef:this.LocalofferRequestDTO.orderRef,
                shipmentType:this.LocalofferRequestDTO.shipmentType,
                weight:this.LocalofferRequestDTO.weight,
                dimensions:this.LocalofferRequestDTO.dimensions,
              });
              this.reciverAddress.patchValue({
                name: this.LocalofferRequestDTO.reciverAddress.name,
                phone: this.LocalofferRequestDTO.reciverAddress.phone,
                street :this.LocalofferRequestDTO.reciverAddress.street,
                email :this.LocalofferRequestDTO.reciverAddress.email,
                cityIdTo: this.LocalofferRequestDTO.reciverAddress.cityIdTo
              });


            }
        }
        else if (this.LocalOrderSatat.IsProcessing&&this.LocalOrderSatat.IsProcessed&&this.LocalOrderSatat.IsManual &&
          this.LocalOrderSatat.RowManualOrder) {
          this.Pastable = true;
        }
    });

  }
Paste(){
  this.LocalofferRequestDTO = this.LocalOrderSatat.RowManualOrder;
  if ( this.LocalofferRequestDTO) {
    this.manualOrdersForm.patchValue({
      shipmentdescription: this.LocalofferRequestDTO.shipmentdescription,
      warehouseId:this.LocalofferRequestDTO.warehouseId,
      cityIdFrom:this.LocalofferRequestDTO.cityIdFrom,
      cod:this.LocalofferRequestDTO.cod,
      price:this.LocalofferRequestDTO.price,
      shipmentType:this.LocalofferRequestDTO.shipmentType,
      weight:this.LocalofferRequestDTO.weight,
      dimensions:this.LocalofferRequestDTO.dimensions,
      orderRef: this.generateRandomString()
    });
    this.reciverAddress.patchValue({
      name: this.LocalofferRequestDTO.reciverAddress.name,
      phone: this.LocalofferRequestDTO.reciverAddress.phone,
      street :this.LocalofferRequestDTO.reciverAddress.street,
      email :this.LocalofferRequestDTO.reciverAddress.email,
      cityIdTo: this.LocalofferRequestDTO.reciverAddress.cityIdTo
    });


  }
}
  private getCitiesData() {
    this._MerchentsService.getCities().subscribe({
      next: (res: any) => {
        this.citiesData = res;
      },
      error: (err: any) => { },
      complete: () => { }
    });

    this.shippingService.getAllShipping().subscribe({
      next: (res: any) => {
        this.shippingArray = res;
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  private getShipmentType(typeId: string | number) {
    return this.shippingArray?.find(type => type?.id == typeId);
  }

  private getMerchantWarehouses() {
    let merchantId = JSON.parse(localStorage.getItem('logUserInfo')!).merchentId;
    this._MerchentsService.getMerchantWarehouses(merchantId).subscribe({
      next: (res: any) => {
        this.warehousesData = res;
        if (!res || res?.length == 0) {
          Swal.fire({
            icon: 'error',
            title: `عذرا ليس لديك مستودعات!
            برجاء إنشاء مستودع واحد علي الأقل لتتمكن من إنشاء طلب.`,
            confirmButtonText: 'إنشاء مستودع',
            willClose: () => { this.router.navigate(['merchents/profile']) }
          });
        }
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  private generateRandomString(): string {
    let orderRef = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 6; i++) {
      orderRef += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderRef;
  }

  onChangeLocation(e) {
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
    this.locationChoosen = true;
  }

  toggleMap() {
    this.mapModal = !this.mapModal;
  }


  get reciverAddress() {
    return this.manualOrdersForm.get('reciverAddress') as FormGroup;
  }

  get nationalAddress() {
    return this.manualOrdersForm.get('reciverAddress')?.get('nationalAddress') as FormGroup;
  }

  get moc() {
    return this.manualOrdersForm.controls;
  }

  manualOrdersSubmit() {
    this.isSubmited = true;
    this._MerchentsService.createNewPreOrder(this.manualOrdersForm.value).subscribe({
      next: (res: any) => {
        this.manualOrdersForm.reset();
        this.isSubmited = false;
        this.canRoute = true;
        this.alert = 'تم الحفظ بنجاح';
        setTimeout(() => {
          this.alert = '';
        }, 2000);
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  private getCityIdFrom(): number {
    let warehouseId = this.manualOrdersForm.get('warehouseId')?.value;
    let selectedWarehouse = this.warehousesData.find(item => item.id == warehouseId);
    return selectedWarehouse?.provinceId;
  }

  public submitOrderData() {
    let formValue = this.manualOrdersForm.value;
    let offerRequestDTO = [{
      cityIdTo: formValue?.reciverAddress?.cityIdTo,
      shipmentType: formValue?.shipmentType,
      cod: formValue?.cod,
      warehouseId: formValue?.warehouseId,
      cityIdFrom: formValue?.cityIdFrom,
      orderRef: formValue?.orderRef,
      codValue: formValue?.price,
      cityNameArFrom: this.findCityNameById(formValue?.cityIdFrom),
      cityNameArTo: this.findCityNameById(formValue?.reciverAddress?.cityIdTo),
      shipmentTypeName: this.getShipmentType(formValue?.shipmentType)?.nameAr
    }];
    const savedValue = { ...offerRequestDTO[0], ...formValue };
    localStorage.setItem('excelPreOrdersData', JSON.stringify([savedValue]));
    this.postOfferListData(offerRequestDTO);
  }

  private findCityNameById(cityId) {
    let cityObj = this.citiesData?.find(city => city.id == cityId);
    return cityObj?.nameAr;
  }
  private findCityIdByName(cityName: string) {
    let cityObj = this.citiesData?.find(city => city.nameAr == cityName || city.nameEn == cityName);
   if(cityObj)
    return cityObj?.id;
    else
    return 0;
  }
  private postOfferListData(offerData: any) {
    this._MerchentsService.postOfferList(offerData).subscribe({
      next: (res: any) => {
        if (res?.vendorsOffers?.length == 0) {
          Swal.fire({
            icon: 'error',
            title: `تعذر الحصول علي عروض اسعار طبقا للتغطية الجغرافية`,
          });
        } else {
          this._MerchentsService._OffersDTO.next(res);
          let odrstt:OrderingState =  new OrderingState();
          odrstt.IsManual = true;
          odrstt.IsProcessing = true;
          odrstt.OfferRequestDTO = offerData;
          odrstt.OfferResponseRoot = res;
          odrstt.RowManualOrder = this.manualOrdersForm.value;
          this.orderstate.SetOrderingState(odrstt);
          this.router.navigate(['/merchents/choose-company']);
        }
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }
}
