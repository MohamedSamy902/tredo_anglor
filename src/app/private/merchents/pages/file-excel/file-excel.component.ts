import { Component, OnInit, } from '@angular/core';
import * as XLSX from 'xlsx';
import { MerchentsService } from '../../services/merchents.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { OrderingState } from 'src/app/core/models/Shared/ordering-state';
import { OrderingObserverService } from 'src/app/core/services/ordering-observer.service';
@Component({
  selector: 'app-file-excel',
  templateUrl: './file-excel.component.html',
  styleUrls: ['./file-excel.component.scss'],
})
export class FileExcelComponent implements OnInit {

  firstform: boolean = true;
  secondform: boolean = false;
  thirdform: boolean = false;
  excelDate: any[];
  isempty: boolean = false;
  foundEmptyValue: boolean = false;
  foundEmptyFile: boolean = false;
  counter: number = 0;
  obj: object = {};
  public citiesData: any[];
  public merchantWarehousesData: any[];
  public selectedWarehouseId: number;
  LocalOrderSatat: OrderingState;
  LocalofferRequestDTO;
  constructor(private _MerchentsService: MerchentsService, private router: Router,
    private orderstate:OrderingObserverService) {
    this.getCitiesData();
    this.getMerchantWarehouses();
    this.orderstate.OrderingStateMeta$.subscribe(res=>{
      this.LocalOrderSatat = res;

      if(this.LocalOrderSatat.IsProcessing&&!this.LocalOrderSatat.IsProcessed&&!this.LocalOrderSatat.IsManual &&
        this.LocalOrderSatat.RowExeclOrder){
          this.excelDate = res.RowExeclOrder;
          this.bindexceldata();
        }

    });
  }

  ngOnInit(): void {
    let element: HTMLElement = document.getElementById('loadFileXml') as HTMLElement;
    element.click();
  }

  showForm() {
    this.firstform = true;
    this.secondform = false;
    this.thirdform = false;
  }
  showForm2() {
    this.firstform = false;
    this.secondform = true;
    this.thirdform = false;
  }
  showForm3() {
    this.firstform = false;
    this.secondform = false;
    this.thirdform = true;
  }

  fileUpload(e?: any) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event: any) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.excelDate = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]],
        { defval: '' }
      );
      this.bindexceldata();
      setInterval(() => {
        if (this.counter < 100) {
          this.counter++;
        }
      }, 15);
    };

  }
  bindexceldata(){

    this.excelDate.forEach(item => {
      item['من'] = this.findCityIdByName(item['من']);
      item['الي'] = this.findCityIdByName(item['الي']);
      let wgt = "0";
      let dim = "0";
      let codValue = "0";
      if(item['الوزن'] ){
        wgt = item['الوزن'];
      }
      if(item['الأبعاد'] ){
        dim = item['الأبعاد'];
      }
       item['الوزن'] = wgt;
       item['الأبعاد'] = dim ;

       if(item['مبلغ التحصيل من العميل'] ){
        codValue = item['مبلغ التحصيل من العميل'];
      }
      item['مبلغ التحصيل من العميل'] = codValue;
      if(Number.parseFloat(codValue)> 0){

      }
    });
    this.handlingPreOrderData();
  }

  private findCityIdByName(cityName: string) {
    let cityObj = this.citiesData?.find(city => city.nameAr == cityName);
    return cityObj?.id;
  }

  private findCityNameById(cityId) {
    let cityObj = this.citiesData?.find(city => city.id == cityId);
    return cityObj?.nameAr;
  }

  private handlingPreOrderData(): any[] {
    const groupRef = this.generateRandomString();
    let preOrdersData: any[] = this.excelDate?.map((order: any) => {

      return {
        shipmentdescription: order['وصف الشحنة'],
        shipmentType: order['نوع الشحنة'],
        reciverAddress: {
          cityIdTo: order['الي'],
          street: order['العنوان'],
          name: order['اسم المستقبل'],
          phone: order['رقم هاتف المستقبل']
        },
        price: order['مبلغ التحصيل من العميل'],
        codValue: order['مبلغ التحصيل من العميل'],
        cod: Number.parseFloat(order['مبلغ التحصيل من العميل'])> 0 ? order['مبلغ التحصيل من العميل'] : 0,
        weight: order['الوزن'] ,
        width: order['الأبعاد'] ,
        dimensions: order['الأبعاد'] ,
        cityIdFrom: order['من'],
        orderRef: this.generateRandomString(),
        cityNameArFrom: this.findCityNameById(order['من']),
        cityNameArTo: this.findCityNameById(order['الي']),
        groupRef: groupRef,
        isGrouped: 1,
        warehouseId: this.selectedWarehouseId,
        shipmentTypeName: order['نوع الشحنة']
      }
    });
    if(preOrdersData.length > 0){

      localStorage.setItem('excelPreOrdersData', JSON.stringify(preOrdersData));
      this.foundEmptyFile = false;

    }
    else{
      this.foundEmptyFile = true;
    }
    return preOrdersData;
  }

  private generateRandomString(): string {
    let orderRef = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 6; i++) {
      orderRef += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderRef;
  }

  private handlingOfferRequestDTO() {
    const preOrdersData = this.handlingPreOrderData();
    const offerRequestDTO = preOrdersData?.map((order: any) => {
      return {
        cityIdTo: +order?.reciverAddress?.cityIdTo,
        cityIdFrom: order?.cityIdFrom,
        shipmentType: this.checkshipmentTypeValue(order?.shipmentType),
        cod: this.checkCODValue(order?.price),
        orderRef: order.orderRef,
        warehouseId: order.warehouseId ,
      }
    });
    return offerRequestDTO;
  }

  private checkCODValue(codValue: string): boolean {
    if (codValue !== '' || codValue != null || codValue !== undefined) return true;
    return false;
  }

  private checkshipmentTypeValue(type: string): number {
    if (type?.includes('صندوق')) return 1;
    return 2;
  }

  public postOfferListData() {
    let offerRequestDTO = this.handlingOfferRequestDTO();

    this._MerchentsService.postOfferList(offerRequestDTO).subscribe({
      next: (res: any) => {
        if (res?.vendorsOffers?.length == 0) {
          Swal.fire({
            icon: 'error',
            title: `تعذر الحصول علي عروض اسعار طبقا للتغطية الجغرافية`,
          });
        } else {
          this._MerchentsService._OffersDTO.next(res);
          let odrstt:OrderingState =  new OrderingState();
          odrstt.IsManual = false;
          odrstt.IsProcessing = true;
          odrstt.OfferRequestDTO = offerRequestDTO;
          odrstt.OfferResponseRoot = res;
          odrstt.RowExeclOrder =this.excelDate;
          this.orderstate.SetOrderingState(odrstt);
          this.router.navigate(['/merchents/choose-company']);
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: `حدث خطأ! برجاء المحاولة مرة أخري.`,
        });
      },
      complete: () => { }
    });
  }

  searchForEmptyValues() {
    for (const obj of this.excelDate) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
          this.foundEmptyValue = true;
          this.isempty = true;
        }
        this.isempty = false;
      }
    }
  }

  checkForEmptyValue(obj: any): boolean {
    let hasEmptyValue = false;
    for (let key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === null || obj[key] === undefined || obj[key] === '')
      ) {
        if (!obj['بريد المستقبل الالكتروني']) obj['بريد المستقبل الالكتروني'] = ' ';
        if (!obj['مبلغ التحصيل من العميل']) obj['مبلغ التحصيل من العميل'] = ' ';
        if (!obj['الوزن']) obj['الوزن'] = '0 ';
        if (!obj['الأبعاد']) obj['الأبعاد'] = '0 ';
        hasEmptyValue = true;
        this.isempty = true;
        break;
      }
      this.isempty = false;
    }
    obj.hasEmptyValue = hasEmptyValue;
    return hasEmptyValue;
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

  private getMerchantWarehouses() {
    let merchantId = JSON.parse(localStorage.getItem('logUserInfo')!).merchentId;
    this._MerchentsService.getMerchantWarehouses(merchantId).subscribe({
      next: (res: any) => {
        this.merchantWarehousesData = res;
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
}
