import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowpostsPageRoutingModule } from './showposts-routing.module';

import { ShowpostsPage } from './showposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowpostsPageRoutingModule
  ],
  declarations: [ShowpostsPage]
})
export class ShowpostsPageModule {}
