import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderEditPage } from '../order-edit/order-edit.page';

import { OrderDetailsPage } from './order-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsPage,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderEditPageRoutingModule {}
