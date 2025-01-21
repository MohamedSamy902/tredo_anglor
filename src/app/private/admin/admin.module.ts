import { HeadersInterceptor } from '../../core/services/admin/interceptors/headers.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './../../shared/layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ShippingCompaniesComponent } from './pages/shipping-companies/shipping-companies.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AssignPermissionsComponent } from './pages/assign-permissions/assign-permissions.component';
//  import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { AllMerchantComponent } from './pages/all-merchant/all-merchant.component';
import { AllCitiesComponent } from './pages/all-cities/all-cities.component';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { AllShippingComponent } from './pages/all-shipping/all-shipping.component';
import { AddShippingComponent } from './pages/add-shipping/add-shipping.component';
import { AllUserPermissionsComponent } from './pages/all-user-permissions/all-user-permissions.component';
import { DialogModule } from 'primeng/dialog';
import { HomeFilterPipe } from './pipes/home-filter.pipe';
import { AdminMerchantProfileComponent } from './pages/admin-merchant-profile/admin-merchant-profile.component';
import { MerchantProfileDataModule } from 'src/app/shared/merchant-profile/merchant-profile-data.module';

import { FinancialreportsComponent } from './pages/financialreports/financialreports.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ListboxModule } from 'primeng/listbox';
import { SafePipe } from './pipes/safe.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    HomeComponent,
    AdminLayoutComponent,
    ShippingCompaniesComponent,
    AddCompanyComponent,
    SearchfilterPipe,
    AllMerchantComponent,
    AllCitiesComponent,
    NameFilterPipe,
    AddCityComponent,
    AllShippingComponent,
    AddShippingComponent,
    AssignPermissionsComponent,
    AllUserPermissionsComponent,
    HomeFilterPipe,
    AdminMerchantProfileComponent,
    FinancialreportsComponent,
    SafePipe
  ],
  imports: [
    CheckboxModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    AdminRoutingModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    MegaMenuModule,
    ListboxModule,
    CardModule,
    ToastModule,
    MerchantProfileDataModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    MessageService
  ]
})
export class AdminModule { }
