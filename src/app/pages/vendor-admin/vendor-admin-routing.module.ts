import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorAdminPage } from './vendor-admin.page';

const routes: Routes = [
  {
    path: '',
    component: VendorAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorAdminPageRoutingModule {}
