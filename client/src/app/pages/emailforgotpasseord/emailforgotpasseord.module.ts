import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailforgotpasseordPageRoutingModule } from './emailforgotpasseord-routing.module';

import { EmailforgotpasseordPage } from './emailforgotpasseord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmailforgotpasseordPageRoutingModule
  ],
  declarations: [EmailforgotpasseordPage]
})
export class EmailforgotpasseordPageModule {}
