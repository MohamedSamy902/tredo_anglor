import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';
import { VendorsLayoutComponent } from './shared/layouts/vendors-layout/vendors-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchentsLayoutComponent } from './shared/layouts/merchents-layout/merchents-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./private/admin/admin.module').then(m => m.AdminModule),
        // canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: 'merchents',
    component: MerchentsLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./private/merchents/merchents.module').then(m => m.MerchentsModule),
        // canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: 'vendors',
    component: VendorsLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./private/vendors/vendors.module').then(m => m.VendorsModule),
        // canActivate:[AuthGuard]
      }
    ]
  },
  { path: 'auth', loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    /* RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  }) */
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
