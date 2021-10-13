import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MethodShippingPage } from './method-shipping.page';

const routes: Routes = [
  {
    path: '',
    component: MethodShippingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MethodShippingPageRoutingModule {}
