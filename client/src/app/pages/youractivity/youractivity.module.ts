import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YouractivityPageRoutingModule } from './youractivity-routing.module';

import { YouractivityPage } from './youractivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YouractivityPageRoutingModule
  ],
  declarations: [YouractivityPage]
})
export class YouractivityPageModule {}
