import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  Form,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { VendorInfo } from 'src/app/core/models/VendorInfo';
import { VendorContract } from 'src/app/core/models/VendorContract';
import { Error } from 'src/app/core/models/Shared/Error';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCompanyComponent implements OnInit {
  pageNumbers: number;
  pageNumber: number = 1;
  pages: number[] = [];
  from: number = 0;
  to: number = 5;
  isNewOperation: boolean;
  isSubmited = false;
  display: boolean = false;
  displayCity: boolean = false;
  shipForm: FormGroup;
  dropdownListRegions: Array<any> = [];
  collectMethodsSelected: Array<{}> = [];
  daysSelected: Array<{}> = [];
  notDaysSelected: Array<{}> = [];
  selectedItemsRegionsRecive: Array<{}> = [];
  selectedItemsRegionsSend: Array<{}> = [];
  selectedItemsRegionsNotSend: Array<{}> = [];
  companies: VendorInfo[] = [];
  id: string;
  cityId: any;
  zone: string = 'Zone1';
  VendorZonePricingsOneGroup: FormGroup;
  VendorZonePricingsTwoGroup: FormGroup;
  VendorZonePricingsThreeGroup: FormGroup;
  VendorZonePricingsFoureGroup: FormGroup;
  dropdownListShipping: any;
  model = {
    price: 0,
    vatValue: 0,
    commissionValue: 0,
    total: 0,
    shippingTypeId: 0,
    id:0
  };
  @ViewChild('shippingForm') shippingForm: any;
  ShippingZoneOne: any[] = [];
  ShippingZoneTwo: any[] = [];
  ShippingZoneThree: any[] = [];
  ShippingZoneFour: any[] = [];
  idModel: any;
  citiesZoneOne: any[] = [];
  citiesZoneTwo: any[] = [];
  citiesZoneThree: any[] = [];
  citiesZoneFour: any[] = [];
  checkCityiesValue: string = 'citiesZoneOne';
  cities: any[];
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      if (res['id']) this.getComponeyById(res['id']);
    });
    this.route.data.subscribe((res) => {
      this.dropdownListRegions = res['Cities'];
      this.cities = [...this.dropdownListRegions];
      this.dropdownListShipping = res['Shipping'];
    });
    this.isNewOperation = true;

    this.shipForm = this.fb.group({
      pictureRow: ['', [Validators.required]],
      officialName: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      nameEn: ['', [Validators.required]],
      commercialName: ['', [Validators.required]],
      comFileNo: ['', [Validators.required]],
      taxFileNo: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      bankName: [],
      serviceCode: [{ value: '', disabled: false }, []],
      email: ['', [Validators.required, Validators.email]],
      iban: ['', [Validators.required, Validators.maxLength(40)]],
      codCommission: ['', [Validators.required]],
      contractStartDate: ['', [Validators.required]],
      contractEndDate: ['', [Validators.required]],
      codActive: ['', [Validators.required]],
      codTransDuDays: ['', [Validators.required]],
      triesCount: ['', [Validators.required]],
      extraKMDistanceCost: ['', [Validators.required]],
      extraKMWeightCost: ['', [Validators.required]],
      maxCompensationValue: ['', [Validators.required]],
      pickUpFees: ['', [Validators.required]],
      returnFees: ['', [Validators.required]],
      failureShipFees: ['', [Validators.required]],
      failureShipReturnDuInDays: ['', [Validators.required]],
      isLinked: ['', [Validators.required]],
      isAvTracking: ['', [Validators.required]],
      pCode: [''],
      status: 1,
      conditionsURL: [' ', [Validators.required]],
      // RecivingInLocalWareHouseOnly: ['', [Validators.required]],
      // DeliveryInLocalWareHouseOnly: ['', [Validators.required]],
      vendorZones: this.fb.array([]),
    });

    this.VendorZonePricingsOneGroup = this.fb.group({
      price: [0, Validators.required],
      vatValue: 0,
      commissionValue: [0, Validators.required],
      total: 0,
      shippingTypeId: 1,
      id: 0,
    });
    const rangeOne = this.fb.group({
      startRecivingTime: [''],
      endRecivingTime: [''],
      vendorZonePricings: this.fb.array([]),
      geoCoverageLevel: 1,
      id: 0,
      vendorInfoId: 0,
      vendorZoneGeos: this.fb.array([
        this.fb.group({
          cityId: ['', Validators.required],
          id: 0,
        }),
      ]),
    });
    this.VendorZonePricingsTwoGroup = this.fb.group({
      price: 0,
      vatValue: 0,
      commissionValue: 0,
      total: 0,
      shippingTypeId: 1,
    });
    const rangeTwo = this.fb.group({
      startRecivingTime: [''],
      endRecivingTime: [''],
      geoCoverageLevel: 2,
      id: 0,
      vendorInfoId: 0,
      vendorZonePricings: this.fb.array([]),
      vendorZoneGeos: this.fb.array([
        this.fb.group({
          cityId: '',
          id: 0,
        }),
      ]),
    });
    this.VendorZonePricingsThreeGroup = this.fb.group({
      price: 0,
      vatValue: 0,
      commissionValue: 0,
      total: 0,
      shippingTypeId: 1,
      id: 0,
    });
    const rangeThree = this.fb.group({
      startRecivingTime: [''],
      endRecivingTime: [''],
      geoCoverageLevel: 3,
      id: 0,
      vendorInfoId: 0,
      vendorZonePricings: this.fb.array([]),
      vendorZoneGeos: this.fb.array([
        this.fb.group({
          cityId: '',
          id: 0,
        }),
      ]),
    });
    this.VendorZonePricingsFoureGroup = this.fb.group({
      price: 0,
      vatValue: 0,
      commissionValue: 0,
      total: 0,
      id: 0,
      shippingTypeId: 1,
    });
    const rangeFour = this.fb.group({
      startRecivingTime: [''],
      endRecivingTime: [''],
      geoCoverageLevel: 4,
      id: 0,
      vendorInfoId: 0,
      vendorZonePricings: this.fb.array([]),
      vendorZoneGeos: this.fb.array([
        this.fb.group({
          cityId: '',
          id: 0,
        }),
      ]),
    });
    this.vendorZones.push(rangeOne);
    this.vendorZones.push(rangeTwo);
    this.vendorZones.push(rangeThree);
    this.vendorZones.push(rangeFour);
  }

  selectCity(name, cityId, event) {
    if (!event.target.checked)
      this[this.checkCityiesValue] = this[this.checkCityiesValue].filter(
        (res) => res.name !== name
      );
    else this[this.checkCityiesValue].push({ name, cityId, id: 0 });
    this.handlePaginationTable();
  }

  selectAllCity(event) {
    if (event.target.checked)
      this[this.checkCityiesValue] = [...this.dropdownListRegions];
    else this[this.checkCityiesValue] = [];
    this[this.checkCityiesValue] = this[this.checkCityiesValue].map((res) => ({
      name: res.nameAr,
      cityId: res.id,
      id: 0,
    }));
    this.handlePaginationTable();
  }

  handlePaginationTable() {
    this.pageNumbers = Math.ceil([this.checkCityiesValue].length / 5);
    for (let index = 0; index < this.pageNumbers; index++) {
      this.pages.push(index);
    }
  }

  calculate() {
    this.model['vatValue'] = this.model['price'] * 0.15;
    this.model['total'] =
      this.model['price'] +
      this.model['commissionValue'] +
      this.model['vatValue'];
  }
  imgSrc: string | null | ArrayBuffer = 'assets/imgs/upload-img.png';

  getComponeyById(id: string) {
    this.id = id;
    this.adminService.getVendorById(id).subscribe((res) => {
      this.shipForm.patchValue(res);
      this.imgSrc = '';
      this.imgSrc = res.pictureRow;
      if (res.vendorZones[0])
        this.handlVendorZones(0, res, 'ShippingZoneOne', 'citiesZoneOne');
      if (res.vendorZones[1])
        this.handlVendorZones(1, res, 'ShippingZoneTwo', 'citiesZoneTwo');
      if (res.vendorZones[2])
        this.handlVendorZones(2, res, 'ShippingZoneThree', 'citiesZoneThree');
      if (res.vendorZones[3])
        this.handlVendorZones(3, res, 'ShippingZoneFour', 'citiesZoneFour');
    });
    this.handlePaginationTable();
  }

  deleteCity(id, citiesZone) {
    this[citiesZone] = this[citiesZone].filter((res) => res.cityId !== id);
  }

  handlVendorZones(index, res, ShippingZone, citiesZone) {
    res.vendorZones[index].vendorZoneGeos.forEach((element) => {
      this[citiesZone].push({
        name: element.city.nameAr,
        cityId: element.cityId,
        id: element.id,
      });
    });
    this[ShippingZone] = res.vendorZones[index].vendorZonePricings.map(
      (res) => ({
        price: res['price'],
        vatValue: res['vatValue'],
        commissionValue: res['commissionValue'],
        total: res['total'],
        shippingTypeId: res['shippingTypeId'],
        shippingType: res['shippingType'],
        id: res['id'],
      })
    );
    res.vendorZones[index].vendorZoneGeos.forEach((response) => {
      this.vendorZones.controls[index].addControl(
        'id',
        new FormControl(response['vendorZoneId'], Validators.required)
      );
      this.vendorZones.controls[index].addControl(
        'vendorInfoId',
        new FormControl(
          res.vendorZones[index].vendorInfoId,
          Validators.required
        )
      );
    });
    this.vendorZones.controls[index]['controls'].vendorZoneGeos[
      'controls'
    ].forEach((element, index) => {
      element.addControl(
        'id',
        new FormControl(
          res.vendorZones[0].vendorZoneGeos[index]['id'],
          Validators.required
        )
      );
    });
  }

  pagination(type: string, pageNumber: number, ZoneOne: string) {
    if (type === 'increase' && this.to <= this[ZoneOne].length) {
      this.from += 5;
      this.to += 5;
      this.pageNumber = pageNumber;
    } else if (type === 'decrease' && this.to !== 5) {
      this.from -= 5;
      this.to -= 5;
      this.pageNumber = pageNumber;
    } else if (type === 'page' && pageNumber) {
      this.from = 0;
      this.from = 5;
      this.from = 5 * pageNumber - 5;
      this.to = pageNumber * 5;
      this.pageNumber = pageNumber;
    }
  }

  delete(id) {
    if (this.zone === 'Zone1')
      this.ShippingZoneOne = this.ShippingZoneOne.filter(
        (res, index) => index != id
      );
    if (this.zone === 'Zone2')
      this.ShippingZoneTwo = this.ShippingZoneTwo.filter(
        (res, index) => index != id
      );
    if (this.zone === 'Zone3')
      this.ShippingZoneThree = this.ShippingZoneThree.filter(
        (res, index) => index != id
      );
    if (this.zone === 'Zone4')
      this.ShippingZoneFour = this.ShippingZoneFour.filter(
        (res, index) => index != id
      );
  }

  edit(id) {
    this.idModel = id;
    if (this.zone === 'Zone1') this.model = this.ShippingZoneOne[id];
    if (this.zone === 'Zone2') this.model = this.ShippingZoneTwo[id];
    if (this.zone === 'Zone3') this.model = this.ShippingZoneThree[id];
    if (this.zone === 'Zone4') this.model = this.ShippingZoneFour[id];
    this.display = true;
  }

  checkNames(name) {
    return this[this.checkCityiesValue].find((res) => res.name === name);
  }

  onImageChange(files) {
    if (files) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        let fileReader = event.target as FileReader;
        this.imgSrc = fileReader.result;
        this.shipForm.patchValue({
          pictureRow: this.imgSrc,
        });
      };
    }
  }

  get vendorZones(): any {
    return this.shipForm.get('vendorZones') as FormArray;
  }

  get ragesCon() {
    return this.vendorZones.controls;
  }
  get rangeOne() {
    return this.ragesCon[0] as FormGroup;
  }
  get rangeTwo() {
    return this.ragesCon[1] as FormGroup;
  }
  get vendorZonePricingsOne() {
    return this.ragesCon[0].controls['vendorZonePricings'] as FormArray;
  }
  get vendorZonePricingsTwo() {
    return this.ragesCon[1].get('vendorZonePricings') as FormArray;
  }
  get vendorZonePricingsThree() {
    return this.ragesCon[2].get('vendorZonePricings') as FormArray;
  }
  get vendorZonePricingsFour() {
    return this.ragesCon[3].get('vendorZonePricings') as FormArray;
  }

  addingShipping() {
    if (
      this.shippingForm.form.value.price &&
      this.shippingForm.form.value.vatValue &&
      this.shippingForm.form.value.vatValue &&
      this.shippingForm.form.value.commissionValue &&
      this.shippingForm.form.value.total
    ) {
      this.display = false;
      if (this.idModel == 0 || this.idModel) {
        if (this.zone === 'Zone1')
          this.ShippingZoneOne[this.idModel] = this.shippingForm.form.value;
        if (this.zone === 'Zone2')
          this.ShippingZoneTwo[this.idModel] = this.shippingForm.form.value;
        if (this.zone === 'Zone3')
          this.ShippingZoneThree[this.idModel] = this.shippingForm.form.value;
        if (this.zone === 'Zone4')
          this.ShippingZoneFour[this.idModel] = this.shippingForm.form.value;
      } else {
        if (this.zone === 'Zone1')
          this.ShippingZoneOne.push({ ...this.shippingForm.form.value });
        if (this.zone === 'Zone2')
          this.ShippingZoneTwo.push({ ...this.shippingForm.form.value });
        if (this.zone === 'Zone3')
          this.ShippingZoneThree.push({ ...this.shippingForm.form.value });
        if (this.zone === 'Zone4')
          this.ShippingZoneFour.push({ ...this.shippingForm.form.value });
      }
      this.shippingForm.reset();
      this.idModel = null;
    }
  }

  get vendorZoneGeoOne() {
    return this.ragesCon[0].get('vendorZoneGeos').controls[0] as FormGroup;
  }
  get vendorZoneGeoTwo() {
    return this.ragesCon[1].get('vendorZoneGeos').controls[0] as FormGroup;
  }
  get vendorZoneGeoThree() {
    return this.ragesCon[2].get('vendorZoneGeos').controls[0] as FormGroup;
  }
  get vendorZoneGeoFour() {
    return this.ragesCon[3].get('vendorZoneGeos').controls[0] as FormGroup;
  }
  get rangeThree() {
    return this.ragesCon[2] as FormGroup;
  }
  get rangeFour() {
    return this.ragesCon[3] as FormGroup;
  }

  get CitiesOneZone() {
    return this.ragesCon[0].get('vendorZoneGeos') as FormArray;
  }

  get CitiesTwoZone() {
    return this.ragesCon[1].get('vendorZoneGeos') as FormArray;
  }

  get CitiesThreeZone() {
    return this.ragesCon[1].get('vendorZoneGeos') as FormArray;
  }

  get CitiesFourZone() {
    return this.ragesCon[1].get('vendorZoneGeos') as FormArray;
  }

  clearZone() {
    this.CitiesOneZone.clear();
    this.CitiesTwoZone.clear();
    this.CitiesThreeZone.clear();
    this.CitiesFourZone.clear();
    this.vendorZonePricingsOne.clear();
    this.vendorZonePricingsTwo.clear();
    this.vendorZonePricingsThree.clear();
    this.vendorZonePricingsFour.clear();
  }

  handleZoneCities() {
    this.citiesZoneOne?.forEach((res) => {
      this.CitiesOneZone.push(
        this.fb.group({
          cityId: [res.cityId, Validators.required],
          id: res.id ? res.id : 0,
        })
      );
    });
    this.citiesZoneTwo?.forEach((res) => {
      this.CitiesTwoZone.push(
        this.fb.group({
          cityId: [res.cityId, Validators.required],
          id: res.id ? res.id : 0,
        })
      );
    });
    this.citiesZoneThree?.forEach((res) => {
      this.CitiesThreeZone.push(
        this.fb.group({
          cityId: [res.cityId, Validators.required],
          id: res.id ? res.id : 0,
        })
      );
    });
    this.citiesZoneFour?.forEach((res) => {
      this.CitiesFourZone.push(
        this.fb.group({
          cityId: [res.cityId, Validators.required],
          id: res.id ? res.id : 0,
        })
      );
    });
  }

  handleShipping() {
    this.ShippingZoneOne.forEach((res) => {
      this.vendorZonePricingsOne.push(
        this.fb.group({ ...res, id: res.id ? res.id : 0 })
      );
    });
    this.ShippingZoneTwo?.forEach((res) => {
      this.vendorZonePricingsTwo.push(
        this.fb.group({ ...res, id: res.id ? res.id : 0 })
      );
    });
    this.ShippingZoneThree?.forEach((res) => {
      this.vendorZonePricingsTwo.push(
        this.fb.group({ ...res, id: res.id ? res.id : 0 })
      );
    });
    this.ShippingZoneFour?.forEach((res) => {
      this.vendorZonePricingsTwo.push(
        this.fb.group({ ...res, id: res.id ? res.id : 0 })
      );
    });
  }
  insertValueZone(item) {
    this.zone = item;
    this.pageNumber = 1;
    this.from = 0;
    this.to = 5;
    if (this.zone === 'Zone1') {
      this.checkCityiesValue = 'citiesZoneOne';
      this.dropdownListRegions = this.dropdownListRegions.filter(
        (res, index) =>
          res.nameAr != this['citiesZoneTwo'][index]?.name &&
          res.nameAr != this['citiesZoneThree'][index]?.name &&
          res.nameAr != this['citiesZoneFour'][index]?.name
      );
    }
    if (this.zone === 'Zone2') {
      this.checkCityiesValue = 'citiesZoneTwo';
      this.dropdownListRegions = this.dropdownListRegions.filter(
        (res, index) =>
          res.nameAr != this['citiesZoneOne'][index]?.name &&
          res.nameAr != this['citiesZoneThree'][index]?.name &&
          res.nameAr != this['citiesZoneFour'][index]?.name
      );
    }
    if (this.zone === 'Zone3') {
      this.checkCityiesValue = 'citiesZoneThree';
      this.dropdownListRegions = this.dropdownListRegions.filter(
        (res, index) =>
          res.nameAr != this['citiesZoneTwo'][index]?.name &&
          res.nameAr != this['citiesZoneOne'][index]?.name &&
          res.nameAr != this['citiesZoneFour'][index]?.name
      );
    }
    if (this.zone === 'Zone4') {
      this.dropdownListRegions = this.dropdownListRegions.filter(
        (res, index) =>
          res.nameAr != this['citiesZoneThree'][index]?.name &&
          res.nameAr != this['citiesZoneTwo'][index]?.name &&
          res.nameAr != this['citiesZoneOne'][index]?.name
      );
      this.checkCityiesValue = 'citiesZoneFour';
    }
  }

  onSubmit() {
    this.clearZone();
    this.isSubmited = true;
    if (this.shipForm.valid) {
      this.handleZoneCities();
      this.handleShipping();
      this.adminService.addVendor(this.shipForm.value, this.id).subscribe(
        (res) => {
          this.isSubmited = false;
          this.router.navigate(['/admin/shipping-companies']);
          Swal.fire({
            icon: 'success',
            title: 'Success',
          });
        },
        (err) => {
          err.error.Errors?.forEach((element) => {
            Swal.fire({
              icon: 'error',
              title: `${Error[element]} is exist`,
            });
          });
        }
      );
    }
  }
}
