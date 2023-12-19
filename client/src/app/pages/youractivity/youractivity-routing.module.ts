import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YouractivityPage } from './youractivity.page';

const routes: Routes = [
  {
    path: '',
    component: YouractivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YouractivityPageRoutingModule {}
