import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MerchentsRoutingModule } from './merchents-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ManualOrderComponent } from './pages/manual-order/manual-order.component';
import { ExcelOrderComponent } from './pages/excel-order/excel-order.component';

import { MerchentsLayoutComponent } from './../../shared/layouts/merchents-layout/merchents-layout.component';
import { TransactionhistoryComponent } from './pages/transactionhistory/transactionhistory.component';
import { ChooseCompanyComponent } from './pages/choose-company/choose-company.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { FileExcelComponent } from './pages/file-excel/file-excel.component';

import { SwiperModule } from 'swiper/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function merchentsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/merchents/', '.json');
}

import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';

import { InputTextModule } from 'primeng/inputtext';
// import { IconModule } from 'primeng/icon';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { CustomersComponent } from './pages/customers/customers.component';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';
import { SupportComponent } from './pages/support/support.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrdersComponent,
    MerchentsLayoutComponent,
    ManualOrderComponent,
    ExcelOrderComponent,
    ChooseCompanyComponent,
    FileExcelComponent,
    ChooseCompanyComponent,
    FileExcelComponent,
    TransactionhistoryComponent,
    OrderdetailsComponent,
    CustomersComponent,
    AddCustomerComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    MerchentsRoutingModule,
    SwiperModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    TagModule,
    SliderModule,
    ProgressBarModule,
    InputTextModule,
    // IconModule,
    MultiSelectModule,
    SelectButtonModule,
    TranslateModule,
    LoadingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken, // Optional, can also be set per map (accessToken input of mgl-map)
      // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
  ]
})
export class MerchentsModule { }
