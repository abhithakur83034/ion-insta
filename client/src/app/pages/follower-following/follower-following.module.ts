import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowerFollowingPageRoutingModule } from './follower-following-routing.module';

import { FollowerFollowingPage } from './follower-following.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowerFollowingPageRoutingModule
  ],
  declarations: [FollowerFollowingPage]
})
export class FollowerFollowingPageModule {}
