import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowsingleprofilePage } from './showsingleprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ShowsingleprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsingleprofilePageRoutingModule {}
