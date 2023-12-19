import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClosefriendsPage } from './closefriends.page';

const routes: Routes = [
  {
    path: '',
    component: ClosefriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClosefriendsPageRoutingModule {}
