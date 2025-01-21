import { MerchantWarehouseFormComponent } from './components/merchant-warehouse-form/merchant-warehouse-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MerchantProfileRoutingModule } from './merchant-profile-routing.module';
import { MerchantProfilePageComponent } from './pages/merchant-profile-page/merchant-profile-page.component';
import { MerchantPlatformSubscriptionFormComponent } from './components/merchant-platform-subscription-form/merchant-platform-subscription-form.component';
import { MerchantCategoryFormComponent } from './components/merchant-category-form/merchant-category-form.component';
import { MerchantWalletFormComponent } from './components/merchant-wallet-form/merchant-wallet-form.component';

import { MerchantProfileDataModule } from 'src/app/shared/merchant-profile/merchant-profile-data.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { merchentsHttpLoaderFactory } from '../../merchents.module';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    MerchantProfilePageComponent,
    MerchantCategoryFormComponent,
    MerchantPlatformSubscriptionFormComponent,
    MerchantWalletFormComponent,
    MerchantWarehouseFormComponent
  ],
  imports: [
    CommonModule,
    MerchantProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MerchantProfileDataModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: merchentsHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken, // Optional, can also be set per map (accessToken input of mgl-map)
      // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
  ],
  exports: [NgxMapboxGLModule]
})
export class MerchantProfileModule { }
