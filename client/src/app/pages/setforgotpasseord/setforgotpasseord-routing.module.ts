import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetforgotpasseordPage } from './setforgotpasseord.page';

const routes: Routes = [
  {
    path: '',
    component: SetforgotpasseordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetforgotpasseordPageRoutingModule {}
