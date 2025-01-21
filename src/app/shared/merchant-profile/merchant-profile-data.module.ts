import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MerchantProfileDataComponent } from './components/merchant-profile-data/merchant-profile-data.component';
import { MerchantChooseProfileImageComponent } from './components/merchant-choose-profile-image/merchant-choose-profile-image.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    MerchantProfileDataComponent,
    MerchantChooseProfileImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    TableModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    SelectButtonModule
  ],
  exports: [MerchantProfileDataComponent]
})
export class MerchantProfileDataModule { }
