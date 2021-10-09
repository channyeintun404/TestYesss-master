import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorPlanPage } from './vendor-plan.page';

const routes: Routes = [
  {
    path: '',
    component: VendorPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPlanPageRoutingModule {}
