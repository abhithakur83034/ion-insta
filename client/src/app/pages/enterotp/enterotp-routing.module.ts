import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterotpPage } from './enterotp.page';

const routes: Routes = [
  {
    path: '',
    component: EnterotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterotpPageRoutingModule {}
