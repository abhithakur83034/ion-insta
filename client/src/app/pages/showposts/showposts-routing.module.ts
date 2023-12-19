import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowpostsPage } from './showposts.page';

const routes: Routes = [
  {
    path: '',
    component: ShowpostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowpostsPageRoutingModule {}
