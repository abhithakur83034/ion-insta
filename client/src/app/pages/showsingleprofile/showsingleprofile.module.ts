import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowsingleprofilePageRoutingModule } from './showsingleprofile-routing.module';

import { ShowsingleprofilePage } from './showsingleprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowsingleprofilePageRoutingModule
  ],
  declarations: [ShowsingleprofilePage]
})
export class ShowsingleprofilePageModule {}
