import { OrderdetailsComponent } from './../merchents/pages/orderdetails/orderdetails.component';
import { AdminMerchantProfileComponent } from './pages/admin-merchant-profile/admin-merchant-profile.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { ShippingCompaniesComponent } from './pages/shipping-companies/shipping-companies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { AssignPermissionsComponent } from './pages/assign-permissions/assign-permissions.component';
import { VendorsResolver } from 'src/app/core/resolvers/Vendors.resolver';
import { CitiesResolver } from 'src/app/core/resolvers/Cities.resolver';
import { AllMerchantComponent } from './pages/all-merchant/all-merchant.component';
import { MerchantResolver } from 'src/app/core/resolvers/Merchants.resolver';
import { AllCitiesComponent } from './pages/all-cities/all-cities.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { AllShippingComponent } from './pages/all-shipping/all-shipping.component';
import { ShippingResolver } from 'src/app/core/resolvers/Shipping.resolver';
import { AddShippingComponent } from './pages/add-shipping/add-shipping.component';
import { RegionsResolver } from 'src/app/core/resolvers/Regions.resolver';
import { AllUserPermissionsComponent } from './pages/all-user-permissions/all-user-permissions.component';
import { RoleGuard } from 'src/app/shared/gards/role.guard';
import { Role } from 'src/app/core/Enums/Role';
import { OrdersShipResolver } from 'src/app/core/resolvers/OrdersShip.resolver';
import { FinancialreportsComponent } from './pages/financialreports/financialreports.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [RoleGuard
    //   .forRoles(Role.AddShippingCompany, Role.SystemAdministrator,
    //     Role.AddMerchant, Role.CancellationShipmentRequest,
    //     Role.DeleteMerchant, Role.DeleteShippingCompany,
    //     Role.ModifySipmentInformation, Role.ShowMerchant,
    //     Role.StopWallet, Role.UpdateMerchant,
    //     Role.ViewShippingCompany, Role.ViewReports, Role.ViewGeneralFinancialStatement,
    //     Role.ViewFinancialStatementsOfShippingCompany, Role.ViewAnalysisData,
    //     Role.UpdateWalletBalance, Role.ViewFinancialStatementOfMerchant,
    //     Role.UpdateShippingCompany)],
    resolve: {
      //OrdersShip: OrdersShipResolver,
      // Merchant: MerchantResolver,
      // Vendors: VendorsResolver
    }
  },
  {
    path: 'shipping-companies',
    component: ShippingCompaniesComponent,
    resolve: {
      Vendors: VendorsResolver
    },
    // canActivate: [RoleGuard.forRoles(Role.ViewShippingCompany, Role.SystemAdministrator)],
    // canActivate:[RoleGuard]

  },
  {
    path: 'add-company/:id',
    component: AddCompanyComponent,
    resolve: {
      Cities: CitiesResolver,
      Shipping: ShippingResolver
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.UpdateShippingCompany)]
  }
  ,
  {
    path: 'add-company',
    component: AddCompanyComponent,
    resolve: {
      Shipping: ShippingResolver,
      Cities: CitiesResolver
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.AddShippingCompany)]

  },
  {
    path: 'assign-permissions/:Id',
    component: AssignPermissionsComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  }
  ,
  {
    path: 'assign-permissions',
    component: AssignPermissionsComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  },
  {
    path: 'all-users',
    component: AllUserPermissionsComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  },
  {
    path: "all-merchant",
    component: AllMerchantComponent,
    resolve: {
      Merchant: MerchantResolver
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.ShowMerchant)]

  },
  {
    path: "cities",
    component: AllCitiesComponent,
    resolve: {
      Cities: CitiesResolver
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  },
  {
    path: "add-city/:id",
    component: AddCityComponent,
    resolve: {
      Regions: RegionsResolver,
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  },
  {
    path: "add-city",
    component: AddCityComponent,
    resolve: {
      Regions: RegionsResolver,
    },
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]

  },
  {
    path: "shippings",
    component: AllShippingComponent,
    resolve: {
      Shipping: ShippingResolver
    }, // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]
  },
  {
    path: "add-shipping/:id",
    component: AddShippingComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.ModifySipmentInformation)]

  }
  ,
  {
    path: "add-shipping",
    component: AddShippingComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]
  },
  {
    path: "merchant-profile",
    component: AdminMerchantProfileComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.AddMerchant)]
  },
  {
    path: "merchant-profile/:id",
    component: AdminMerchantProfileComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.AddMerchant)]
  },
  {
    path: "financial-reports",
    component: FinancialreportsComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator)]
  },
  {
    path: "order-details/:id",
    component: OrderdetailsComponent,
    // canActivate: [RoleGuard.forRoles(Role.SystemAdministrator, Role.AddMerchant)]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
