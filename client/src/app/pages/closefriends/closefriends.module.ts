import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClosefriendsPageRoutingModule } from './closefriends-routing.module';

import { ClosefriendsPage } from './closefriends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosefriendsPageRoutingModule
  ],
  declarations: [ClosefriendsPage]
})
export class ClosefriendsPageModule {}
