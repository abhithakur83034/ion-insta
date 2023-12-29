import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailforgotpasseordPage } from './emailforgotpasseord.page';

const routes: Routes = [
  {
    path: '',
    component: EmailforgotpasseordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailforgotpasseordPageRoutingModule {}
