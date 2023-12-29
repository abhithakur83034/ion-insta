import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingssPage } from './settingss.page';

const routes: Routes = [
  {
    path: '',
    component: SettingssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingssPageRoutingModule {}
