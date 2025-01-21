import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicLayoutComponent } from './../shared/layouts/public-layout/public-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { WorkComponent } from './pages/work/work.component';
import { VedorComponent } from './pages/vedor/vedor.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    PublicLayoutComponent,
    ProjectComponent,
    WorkComponent,
    VedorComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicModule { }
