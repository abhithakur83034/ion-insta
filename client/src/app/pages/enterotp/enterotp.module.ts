import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterotpPageRoutingModule } from './enterotp-routing.module';

import { EnterotpPage } from './enterotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EnterotpPageRoutingModule
  ],
  declarations: [EnterotpPage]
})
export class EnterotpPageModule {}
