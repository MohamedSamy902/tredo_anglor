import { SupportComponent } from './pages/support/support.component';
import { TransactionhistoryComponent } from './pages/transactionhistory/transactionhistory.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { AdminChooseCompanyComponent } from './pages/admin-choose-company/admin-choose-company.component';
import { FileExcelComponent } from './pages/file-excel/file-excel.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManualOrderComponent } from './pages/manual-order/manual-order.component';
import { ExcelOrderComponent } from './pages/excel-order/excel-order.component';
import { ChooseCompanyComponent } from './pages/choose-company/choose-company.component';
import { UserRoleGuard } from 'src/app/shared/gards/user-role.guard';
import { AddCustomerComponent } from './pages/add-customer/add-customer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'orders',
    component: OrdersComponent,
    // canActivate: [UserRoleGuard],

  },
  {
    path: 'customers',
    component: CustomersComponent,
    // canActivate: [UserRoleGuard],

  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    // canActivate: [UserRoleGuard],

  },
  {
    path: 'order-details',
    component: OrderdetailsComponent,
    // canActivate: [UserRoleGuard],

  },
  {
    path: 'order-details/:id',
    component: OrderdetailsComponent,
     // canActivate: [UserRoleGuard],

  },
  {
    path: 'manual-order',
    component: ManualOrderComponent,
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'excel-order',
    component: ExcelOrderComponent,
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'choose-company',
    component: ChooseCompanyComponent,
    data: { state: {} },
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'FileExcel',
    component: FileExcelComponent,
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'admin-choose',
    component: AdminChooseCompanyComponent,
    // canActivate: [UserRoleGuard]

  },
  {
    path: 'support',
    component: SupportComponent,
    // canActivate: [UserRoleGuard]

  },
  { path: 'profile', loadChildren: () => import('./pages/merchant-profile/merchant-profile.module').then(m => m.MerchantProfileModule),
    // canActivate: [UserRoleGuard]
  },
  { path: 'profile/:id', loadChildren: () => import('./pages/merchant-profile/merchant-profile.module').then(m => m.MerchantProfileModule),
    //  canActivate: [UserRoleGuard]
      },
  { path: 'transaction-history', component: TransactionhistoryComponent,
    //  canActivate: [UserRoleGuard]
     },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchentsRoutingModule { }
