import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/shared/i18n.service';
import { MerchentsService } from '../../services/merchents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit, AfterViewChecked {
  inCompelteBtn = false;
  checked = false;

  public ordersData: any[];
  public filteredOrdersData: any[];
  public ordersDataLoading: boolean;
  public selectedOrderType: number;
  public ordersListFilters: any[] = [
    { name: 'طلبات مقبولة', value: 2 },
    { name: 'طلبات مؤكدة', value: 3 },
    { name: 'طلبات قيد التوصيل', value: 4 },
    { name: 'طلبات مكتملة', value: 5 },
    { name: 'طلبات متعثرة', value: 7 },
    { name: 'طلبات ملغية', value: 6 },
  ];

  constructor(private translate: TranslateService,
    private i18nService: I18nService,
    private _MerchentsService: MerchentsService
  ) {
    translate.setDefaultLang('ar');
    translate.use('ar');
  }

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
    this.getMerchantOrders();
  }

  ngAfterViewChecked(): void {
    this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
  }

  inCompelteTab() {
    this.inCompelteBtn = true;
  }

  compelteTab() {
    this.inCompelteBtn = false;
  }

  private getMerchantOrders() {
    this.ordersDataLoading = true;
    const merchantId = JSON.parse(localStorage.getItem('logUserInfo')!).merchentId;
    this._MerchentsService.getMerchentOrders(merchantId).subscribe({
      next: (res: any) => {
        this.ordersData = res;
      },
      error: (err: any) => {
        this.ordersDataLoading = false;
      },
      complete: () => {
        this.selectedOrderType = 2;
        this.filterOrdersDataByStatus(2);
        this.ordersDataLoading = false;
      }
    })
  }

  public filterOrdersDataByStatus(status: number) {
    console.log(status);

    this.filteredOrdersData = this.ordersData.filter(order => order?.operationalStatus == status);
  }
  delete(id) {
    Swal.fire({
      title: `${this.translate.instant("AreYouSureYouWantDelete")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `${this.translate.instant("Yes,DeleteIt!")}`,
      cancelButtonText: `${this.translate.instant("Cancel")}`
    }).then((result) => {
      if (result.isConfirmed) {
        this._MerchentsService.CancelOrder(id).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${this.translate.instant("DeletedSuccessfully")}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    })
  }
}
