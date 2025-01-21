import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
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
import { AuthService } from 'src/app/core/authentication/auth.service';
import { OrderingState } from 'src/app/core/models/Shared/ordering-state';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { MerchantService } from 'src/app/core/services/merchant/merchant.service';
import { OrderingObserverService } from 'src/app/core/services/ordering-observer.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { MerchentsService } from '../../services/merchents.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
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
})
export class HomeComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  //////////////////1////////////////////
  showSuccessMessage: boolean;

  series: ApexNonAxisChartSeries = [25, 45, 40];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: false,
    },
    width: 300,
    height: 300,
  };
  legend: ApexLegend = { show: false };
  datalable1: ApexDataLabels = {
    enabled: false,
  };
  colors: ['#25788E', '#FF695B', '#FFBE4F'];
  options: any = [
    { id: 1, EnName: 'Month', ArName: 'اليوم', isSelected: true },
    { id: 2, EnName: 'Today', ArName: 'الامس', isSelected: false },
    { id: 3, EnName: 'This month', ArName: 'هذا الشهر', isSelected: false },
    { id: 4, EnName: 'Last Month', ArName: 'الشهر السابق', isSelected: false },
    { id: 5, EnName: 'This Year', ArName: 'هذا العام', isSelected: false },
    { id: 6, EnName: 'Last Year', ArName: 'العام السابق', isSelected: false },
  ];
  ///////////////// 2 area /////////////////
  series2: ApexAxisChartSeries;
  chart2: ApexChart;
  title2: ApexTitleSubtitle;
  yxis2: ApexYAxis;
  Xxis2: ApexXAxis;
  datalable2: ApexDataLabels = {
    enabled: false,
  };

  /////////////////// 3 bar //////////////////

  series3: ApexAxisChartSeries;
  chart3: ApexChart;
  title3: ApexTitleSubtitle;
  yxis3: ApexYAxis;
  Xxis3: ApexXAxis;
  plotOptions: ApexPlotOptions;
  datalable3: ApexDataLabels = {
    enabled: false,
  };

  /////////////////// 5 bar red //////////////////

  series5: ApexAxisChartSeries;
  chart5: ApexChart;
  title5: ApexTitleSubtitle;
  yxis5: ApexYAxis;
  Xxis5: ApexXAxis;
  plotOptions5: ApexPlotOptions;
  datalable5: ApexDataLabels = {
    enabled: false,
  };

  /////////// 4 area small ///////////////

  series4: ApexAxisChartSeries;
  chart4: ApexChart;
  title4: ApexTitleSubtitle;
  yxis4: ApexYAxis;
  Xxis4: ApexYAxis;
  datalable4: ApexDataLabels = {
    enabled: false,
  };

  ///////////////// 2 area /////////////////
  series6: ApexAxisChartSeries;
  chart6: ApexChart;
  title6: ApexTitleSubtitle;
  yxis6: ApexYAxis;
  Xxis6: ApexXAxis;
  plotOptions6: ApexPlotOptions;
  datalable6: ApexDataLabels = {
    enabled: false,
  };
  ///////////////// 2 area /////////////////
  series7: ApexAxisChartSeries;
  chart7: ApexChart;
  title7: ApexTitleSubtitle;
  yxis7: ApexYAxis;
  Xxis7: ApexXAxis;
  plotOptions7: ApexPlotOptions;
  datalable7: ApexDataLabels = {
    enabled: false,
  };
  Statistics: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private merchantService: MerchantService,
    private _merchentsService:MerchentsService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    private orderstate:OrderingObserverService
  ) {}

  /* Charts */
  fill3: ApexFill;
  responsive2: ApexResponsive[];
  responsive3: ApexResponsive[];
  fill5: ApexFill;
  LocalOrderSatat: OrderingState;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      if (res.amount && res.id && res.token ) {
    if ( res.status =="paid") {

      this.paymentService
      .updateSuccessTransaction(
        parseInt(res.amount) / 100,
        res.id,
        res.token
        )
        .subscribe({
          next: () => {
            Swal.fire({
              title: `${this.translate.instant("successpayment")}`,
              icon: 'success',
              timer: 5000,
            position:'center'
          });
          this.location.replaceState('merchents');

          this.showSuccessMessage = true;
                this._merchentsService.getCuurentMerchantInfo(JSON.parse(localStorage.getItem('logUserInfo') ?? '').merchentId);
            },
            error: (err: any) => {
              Swal.fire({
                title: `${this.translate.instant("errorfailedpayment")}`,
                icon: 'error',
                timer: 5000,
              position:'center'
            });
            },  complete: () => {
                   this.showSuccessMessage = false;
                  this.orderstate.OrderingStateMeta$.subscribe(result=>{
                    this.LocalOrderSatat = result;
                    if(this.LocalOrderSatat.IsProcessing&&!this.LocalOrderSatat.IsProcessed&&this.LocalOrderSatat.IsManual &&
                      this.LocalOrderSatat.RowManualOrder){
                        this.router.navigate(['/merchents/choose-company']);

                      };
                    });
                  }
          });
        }
        else{
          Swal.fire({
            title: `${this.translate.instant("errorfailedpayment")}`,
            icon: 'error',
            timer: 5000,
          position:'center'
        });
      }
    }

    });

    this.getOrderStatistics(1);
    this.optiondate2();
    this.optiondate3();
    this.optiondate5();
    this.optiondate6();
    this.optiondate7();
  }
  /* area */
  private optiondate2() {
    this.series2 = [
      {
        name: 'series1',
        data: [11, 32, 45, 32, 34, 52, 41, 100, 80, 90, 70, 80],
        color: '#E8E5EF',
      },
      {
        name: 'series2',
        data: [31, 40, 28, 51, 42, 109, 100, 80, 90, 70, 100, 80],
        color: '#1BAB99',
      },
    ];
    this.chart2 = {
      type: 'area',
      toolbar: {
        show: false,
      },
      height: 323,
      width: '100%',
    };
    this.yxis2 = {
      labels: {
        show: false,
      },
    };
    this.Xxis2 = {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    };
  }
  private optiondate6() {
    this.series6 = [
      {
        name: 'series1',
        data: [11, 32, 45, 32, 34, 52, 41, 100, 80, 90, 70, 80],
        color: '#E8E5EF',
      },
      {
        name: 'series2',
        data: [31, 40, 28, 51, 42, 109, 100, 80, 90, 70, 100, 80],
        color: '#e84f4b',
      },
    ];
    this.chart6 = {
      type: 'area',
      toolbar: {
        show: false,
      },
      height: 323,
      width: '650px',
    };
    this.yxis6 = {
      labels: {
        show: false,
      },
    };
    this.Xxis6 = {
      type: 'category',
      categories: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'اكتوبر',
        'نوفمبر',
        'ديسمبر',
      ],
    };
    this.plotOptions6 = {
      bar: {},
    };
  }
  private optiondate7() {
    this.series7 = [
      {
        name: 'series1',
        data: [11, 32, 45, 32, 34, 52, 41, 100, 80, 90, 70, 80],
        color: '#E8E5EF',
      },
      {
        name: 'series2',
        data: [31, 40, 28, 51, 42, 109, 100, 80, 90, 70, 100, 80],
        color: '#FB1B1C',
      },
    ];
    this.chart7 = {
      type: 'area',
      toolbar: {
        show: false,
      },
      height: 323,
      width: '650px',
    };
    this.yxis7 = {
      labels: {
        show: false,
      },
    };
    this.Xxis7 = {
      type: 'category',
      categories: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'اكتوبر',
        'نوفمبر',
        'ديسمبر',
      ],
    };
    this.plotOptions7 = {
      bar: {},
    };
  }
  /* bar */
  private optiondate3() {
    this.series3 = [
      {
        name: 'طلب',
        data: [150, 70, 160, 170, 250, 105, 91, 114, 94, 150, 52, 250],
      },
    ];
    this.chart3 = {
      type: 'bar',
      background: '#fff',
      toolbar: {
        show: false,
      },
      height: 323,
      width: '650px',
    };
    this.responsive3 = [
      {
        breakpoint: 1401,
        options: {
          chart: {
            width: 450,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 850,
          },
        },
      },
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 700,
          },
        },
      },
      {
        breakpoint: 767,
        options: {
          chart: {
            width: 450,
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            width: '100%',
          },
        },
      },
    ];
    this.fill3 = {
      colors: ['#092D47'],
    };
    this.yxis3 = {
      labels: {
        show: false,
      },
    };
    this.Xxis3 = {
      type: 'category',
      categories: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'اكتوبر',
        'نوفمبر',
        'ديسمبر',
      ],
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

  /* red bar */
  private optiondate5() {
    this.series5 = [
      {
        name: 'طلب',
        data: [150, 70, 160, 170, 250, 105, 91, 114, 94, 150, 52, 250],
      },
    ];
    this.chart5 = {
      type: 'bar',
      background: '#fff',
      toolbar: {
        show: false,
      },
      height: 323,
      width: '650px',
    };
    this.fill5 = {
      colors: ['#FB1B1C'],
    };
    this.yxis5 = {
      labels: {
        show: false,
      },
    };
    this.Xxis5 = {
      type: 'category',
      categories: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'اكتوبر',
        'نوفمبر',
        'ديسمبر',
      ],
    };
    this.plotOptions5 = {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
        borderRadiusApplication: 'around',
      },
    };
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
  }

  getOrderStatistics(actionPeriod: number) {
    const merchantId = this.authService.GetLoginUser().merchentId;
    this.merchantService
      .GetOrderStatisticsByMerchantId(actionPeriod, merchantId)
      .subscribe((res) => {
        this.Statistics = res['order_dash'];
      });
  }
}
