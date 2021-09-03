import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersTabPage } from './orders-tab.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersTabPage,
    children:[
      {
        path: 'orders-tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../orders/orders.module').then(m => m.OrdersModule)
          }
        ]
      },
      {
        path: 'orders-tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../returns/returns.module').then(m => m.ReturnsModule)
          }
        ]
      },
      {
        path: 'orders-tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../shippings/shippings.module').then(m => m.ShippingsModule)
          }
        ]
      }

    ]
  },
  {
    path: '',
    redirectTo: '/orders-tab/orders-tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersTabPageRoutingModule {}
