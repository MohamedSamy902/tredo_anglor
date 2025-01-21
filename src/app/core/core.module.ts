import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OTPComponent } from './components/otp/otp.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';



@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    OTPComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'registeruser', component: RegisterUserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
      { path: 'otp/:email', component: OTPComponent },
      { path: 'resetpassword/:email', component: ResetPasswordComponent },


    ]),
    HttpClientModule,
    ToastrModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ]
})
export class CoreModule { }
