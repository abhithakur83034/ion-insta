import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetforgotpasseordPageRoutingModule } from './setforgotpasseord-routing.module';

import { SetforgotpasseordPage } from './setforgotpasseord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SetforgotpasseordPageRoutingModule
  ],
  declarations: [SetforgotpasseordPage]
})
export class SetforgotpasseordPageModule {}
