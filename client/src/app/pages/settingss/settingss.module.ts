import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingssPageRoutingModule } from './settingss-routing.module';

import { SettingssPage } from './settingss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingssPageRoutingModule
  ],
  declarations: [SettingssPage]
})
export class SettingssPageModule {}
