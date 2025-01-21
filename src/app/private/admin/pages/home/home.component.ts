import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
/* Charts */
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { OrderStatus } from 'src/app/core/models/Shared/ShipmentEnums';
import { I18nService } from 'src/app/shared/i18n.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
interface CustomApexChart extends ApexCharts.ApexOptions {
  colors?: string[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  isLoading: boolean;
  /* Charts */

  public chartOptions: Partial<ChartOptions>;

  //////////////////1////////////////////

  legend: ApexLegend = { show: false };
  typeData: number = 1;
  //////////////////////////////////////////
  dropdownListReturnedMerchents: any[] = [];
  selectedItemsReturnedMerchents: Array<{}> = [];
  dropdownListReturnedCompanies: Array<{}> = [];
  selectedItemsReturnedCompanies: Array<{}> = [];
  dropdownSettings: IDropdownSettings = {};
  options: any = [
    { id: 1, EnName: 'Month', ArName: 'اليوم', isSelected: true },
    { id: 2, EnName: 'Today', ArName: 'الامس', isSelected: false },
    { id: 3, EnName: 'This month', ArName: 'هذا الشهر', isSelected: false },
    { id: 4, EnName: 'Last Month', ArName: 'الشهر السابق', isSelected: false },
    { id: 5, EnName: 'This Year', ArName: 'هذا العام', isSelected: false },
    { id: 6, EnName: 'Last Year', ArName: 'العام السابق', isSelected: false },
  ];
  menuListFinance = [
    {
      id: 1,
      name: 'merchants',
      enName: '',
      arName: 'رصيد محافظ التجار',
      price: '0',
    },
    {
      id: 2,
      name: 'companies',
      enName: '',
      arName: 'رصيد شركات الشحن',
      price: '0',
    },
    {
      id: 3,
      name: 'tredo',
      enName: '',
      arName: 'اجمالي دخل باي شيب',
      price: '0',
    },
  ];
  daysInWeek = [
    { day: 'Sunday', id: 1 },
    { day: 'Monday', id: 2 },
    { day: 'Tuesday', id: 3 },
    { day: 'Wednesday', id: 4 },
    { day: 'Thursday', id: 5 },
    { day: 'Friday', id: 6 },
    { day: 'Saturday', id: 7 },
  ];

  menuListShipments: any = [
    {
      id: 1,
      name: 'returned',
      enName: '',
      arName: 'الشحنات الملغيه',
      offers: '85',
      icon: 'assets/imgs/reurn.png',
      length: '0',
    },
    {
      id: 2,
      name: 'Canceled',
      enName: '',
      arName: 'الشحنات الغير مكتملة',
      offers: '122',
      icon: 'assets/imgs/reurn.png',
      length: '0',
    },
    {
      id: 3,
      name: 'Pending',
      enName: '',
      arName: 'شحنات تحت الاجراء',
      offers: '100',
      icon: 'assets/imgs/proccess.png',
      length: '0',
    },
    {
      id: 4,
      name: 'Submitted',
      enName: '',
      arName: 'شحنات مكتملة',
      offers: '1500',
      icon: 'assets/imgs/Checkmark.png',
      length: '0',
    },
    {
      id: 5,
      name: 'OutforDelivery',
      enName: '',
      arName: 'شحنات جاري توصيلها',
      offers: '1900',
      icon: 'assets/imgs/Delivery.png',
      length: '0',
    },
  ];
  menuSwitch = [
    { id: 1, name: 'data', arName: 'داتا تفصيلية' },
    { id: 2, name: 'maps', arName: 'خرائط بيانية' },
  ];
  selectedSwitch = 'data';
  selectedList = 'merchants';
  DashAdminState: any;
  Statistics: any;
  OrdersShip: any;
  year: number;
  OrdersShipThisYear: any;
  OrdersShipBeforeYear: any;
  OrdersShipBeforeTwoYear: any;
  OrderStatus = OrderStatus;
  actionPeriod: number;
  orderDetails: any;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private lang: I18nService
  ) {}

  /* Charts */
  series3: ApexAxisChartSeries;
  chart3: ApexChart;
  title3: ApexTitleSubtitle;
  yxis3: ApexYAxis;
  Xxis3: ApexXAxis;
  fill: ApexFill;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  datalable3: ApexDataLabels = {
    enabled: false,
  };

  finiaceDashboard: {
    TotalWalletBalance: number | null;
    TotalComissions: number | null;
    TotalVAT: number | null;
    TotalShipFee: number | null;
    TotalTransactions: number | null;
  };
  currentLang;
  ngOnInit(): void {
    this.lang.localeEvent.subscribe((res) => {
      this.currentLang = res;
    });

    this.adminService.GetSystemSummary().subscribe({
      next: (DashboardResponse: any) => {

        this.finiaceDashboard = DashboardResponse;
        this.menuListFinance[0].price =
          DashboardResponse.totalWalletBalance ?? 0;
        this.menuListFinance[1].price =
          DashboardResponse.totalTransactions ?? 0;
        this.menuListFinance[2].price =
          DashboardResponse.totalShipFee ?? 0;
      },
    });
    // this.isLoading = true;
    // this.adminService.getMerchants().subscribe({
    //   next: (merchantsDataResponse) => {
    //     this.isLoading = false;
    //     this.merchantsData = merchantsDataResponse;
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //   },
    // });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nameAr',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختيار الكل',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: 'لا يوجد بيانات',
      searchPlaceholderText: 'ابحث بالاسم',
    };
    this.year = new Date().getFullYear();
    this.route.data.subscribe((res) => {
      this.OrdersShip = res['OrdersShip'];
      this.dropdownListReturnedMerchents = res['Merchant'];
      this.dropdownListReturnedCompanies = res['Vendors'];
      this.OrdersShipThisYear = this.OrdersShip.filter(
        (res) => new Date(res.createdDate).getFullYear() === this.year
      );
      this.OrdersShipBeforeYear = this.OrdersShip.filter(
        (res) => new Date(res.createdDate).getFullYear() === this.year - 1
      );
      this.OrdersShipBeforeTwoYear = this.OrdersShip.filter(
        (res) => new Date(res.createdDate).getFullYear() === this.year - 2
      );
    });
    /* Charts */
    this.optiondate3();
    this.getOrderStatistics(1);
  }

  onChangeSearch(event, id) {
    this.options = this.options.map((res) => {
      if (
        event.target.value !== res.ArName &&
        event.target.value !== res.EnName
      ) {
        return { ...res, isSelected: (res.isSelected = false) };
      }
      return res;
    });

    this.getOrderStatistics(id);
    this.selectedList = '';
  }

  openMenuList(menu) {
    this.selectedList = menu;
  }

  openMenuListOrder(status) {
    this.adminService
      .GetOrdersByActionPeriodAndStatus(
        this.actionPeriod,
        this.OrderStatus[status]
      )
      .subscribe((res) => {
        this.orderDetails = res;
      });
    this.selectedList = status;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getOrderStatistics(actionPeriod: number) {
    this.actionPeriod = actionPeriod;
    this.adminService.GetOrderStatistics(actionPeriod).subscribe((res) => {
      this.Statistics = res['order_dash'];
    });
  }

  selectTab(item) {
    this.selectedSwitch = item;
  }

  /* Charts */
  private optiondate3() {
    this.year = new Date().getFullYear();
    this.series3 = [
      {
        name: 'طلب',
        data: [
          this.OrdersShipBeforeTwoYear.length,
          this.OrdersShipBeforeYear.length,
          this.OrdersShipThisYear.length,
        ],
      },
    ];
    this.chart3 = {
      type: 'bar',
      background: '#fff',
      toolbar: {
        show: false,
      },
      height: 500,
      width: '1000px',
    };
    this.responsive = [
      {
        breakpoint: 1020,
        options: {
          chart: {
            height: 500,
            width: 800,
          },
        },
      },
      {
        breakpoint: 850,
        options: {
          chart: {
            height: 500,
            width: 600,
          },
        },
      },
      {
        breakpoint: 650,
        options: {
          chart: {
            height: 500,
            width: 400,
          },
        },
      },
      {
        breakpoint: 450,
        options: {
          chart: {
            height: 500,
            width: '100%',
          },
        },
      },
    ];
    this.fill = {
      colors: ['#092D47'],
    };
    this.yxis3 = {
      labels: {
        show: false,
      },
    };
    this.Xxis3 = {
      type: 'category',
      categories: [`${this.year - 2}`, `${this.year - 1}`, `${this.year}`],
    };
    this.plotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
        borderRadiusApplication: 'around',
      },
    };
  }
}
