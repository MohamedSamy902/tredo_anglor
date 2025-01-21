import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantProfilePageComponent } from './pages/merchant-profile-page/merchant-profile-page.component';

const routes: Routes = [
  { path: '', component: MerchantProfilePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantProfileRoutingModule { }
