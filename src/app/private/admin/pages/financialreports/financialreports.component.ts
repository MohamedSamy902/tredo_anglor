import { MerchantService } from 'src/app/core/services/merchant/merchant.service';
import { Component, OnInit } from '@angular/core';
import { MerchentsService } from 'src/app/private/merchents/services/merchents.service';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-financialreports',
  templateUrl: './financialreports.component.html',
  styleUrls: ['./financialreports.component.scss']
})
export class FinancialreportsComponent implements OnInit {
  reports: report[];
  rep: report;
  selectedreport: report;
  srcUrl = '';
  rowId = 0;
  showLoading = false;
  merchantid = 0;
  vendorid = 0;
  from = 0;
  to = 0;
  Merchants: any[]=[];
  vendors: any[] = [];
  DateFrom: Date;
  DateTo: Date;

  disablemerchantlookup = true;
  disablevendorlookup = true;
  disablefromlookup = true;
  disabletolookup = true;

    constructor(   private _merchantService: MerchentsService,private _adminservice: AdminService ) {

}
  ngOnInit() {
    this.reports = [
      { name: 'مدفوعات - تجار', code: 'merchantorders' },
      { name: 'عمليات - حساب تاجر', code: 'merchantwtrx' },
      { name: 'مقبوضات - باي شيب', code: 'tredoorders' },
      { name: 'ضرائب مخصمة', code: 'tredoordersvat' },
      { name: 'عملاء - دائنين', code: 'walletsbalances' },
      { name: 'مدفوعات - موردين', code: 'vendororders' }
    ];
    this.getAllMerchant()
    this.DateFrom = new Date();
    this.DateTo = new Date();
    this.DateFrom = new Date(this.DateFrom.getFullYear(), this.DateFrom.getMonth(), 1);
    this.DateTo = new Date(this.DateFrom.getFullYear(), this.DateFrom.getMonth() + 1, 0);
  }
  getAllMerchant() {
    let merresp = this._merchantService.GetMerchantsInfoLite();
    let vendresp = this._adminservice.GetVendorsInfoLite();

    forkJoin([
      merresp,
      vendresp
    ]).subscribe(
      (results) => {
      this.Merchants = results[0] as any[];
      this.vendors = results[1] as any[];
    });

}
  LoadReport() {
    const apiURL = 'https://reports.tredo.biz/viewer?reportname=';// 'https://tredo.awan-is.com/viewer?reportname=';
    this.showLoading = true;
    switch (this.rep.code) {
      case 'merchantorders':
        this.srcUrl = apiURL + 'merchantorders&mid=' + this.merchantid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;
      case 'merchantwtrx':
        this.srcUrl = apiURL + 'merchantwtrx&mid=' + this.merchantid+'&vid=' + this.vendorid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;
      case 'tredoorders':
        this.srcUrl = apiURL + 'tredoorders&mid=' + this.merchantid+'&vid=' + this.vendorid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;
      case 'tredoordersvat':
        this.srcUrl = apiURL + 'tredoordersvat&mid=' + this.merchantid +'&vid=' + this.vendorid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;
      case 'walletsbalances':
        this.srcUrl = apiURL + 'walletsbalances&mid=' + this.merchantid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;
      case 'vendororders':
        this.srcUrl = apiURL + 'vendororders&vid=' + this.vendorid+
        '&rowfrom=' + moment(this.DateFrom).format('YYYYMMDD') + '&rowto=' + moment(this.DateTo).format('YYYYMMDD')
        break;

    }
    console.log(this.srcUrl);

  };
  onLoad() {
    this.showLoading = false;
  }
  ChangeDate(val:Date){
    this.DateTo = new Date(val.getFullYear(), val.getMonth() + 1, val.getDay()- 1);
  }
  SubmitReportView(){
    this.LoadReport();

  }
  ViewControl(){
   switch (this.rep.code) {
      case 'merchantorders':
        this.disablefromlookup = false;
        this.disabletolookup = false;
        this.disablemerchantlookup = false;
        this.disablevendorlookup = true;
        break;
      case 'merchantwtrx':
        this.disablefromlookup = false;
        this.disabletolookup = false;
        this.disablemerchantlookup = false;
        this.disablevendorlookup = true;
        break;
      case 'tredoorders':
        this.disablefromlookup = false;
        this.disabletolookup = false;
        this.disablemerchantlookup = false;
        this.disablevendorlookup = false;
        break;
      case 'tredoordersvat':
        this.disablefromlookup = false;
        this.disabletolookup = false;
        this.disablemerchantlookup = false;
        this.disablevendorlookup = false;
        break;
      case 'walletsbalances':
        this.disablefromlookup = true;
        this.disabletolookup = true;
        this.disablemerchantlookup = true;
        this.disablevendorlookup = true;
        break;
      case 'vendororders':
        this.disablefromlookup = false;
        this.disabletolookup = false;
        this.disablemerchantlookup = true;
        this.disablevendorlookup = false;
        break;

    }
  }
}
export class report {
  name: string;
  code: string;

}
