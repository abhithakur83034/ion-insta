import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowerFollowingPage } from './follower-following.page';

const routes: Routes = [
  {
    path: '',
    component: FollowerFollowingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowerFollowingPageRoutingModule {}
