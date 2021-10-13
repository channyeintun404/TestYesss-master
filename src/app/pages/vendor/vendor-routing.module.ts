import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorPage } from './vendor.page';

const routes: Routes = [
  {
    path: '',
    component: VendorPage,
    children:[
      {
        path: 'vendor1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../general/general.module').then(m => m.GeneralPageModule)
          }
        ]
      },
      {
        path: 'vendor2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../description/description.module').then(m => m.DescriptionPageModule)
          }
        ]
      },
      {
        path: 'vendor3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../logos/logos.module').then(m => m.LogosPageModule)
          }
        ]
      },
      {
        path: 'vendor4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../method-shipping/method-shipping.module').then(m => m.MethodShippingPageModule)
          }
        ]
      },
      {
        path: 'vendor5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../plan/plan.module').then(m => m.PlanPageModule)
          }
        ]
      },
      {
        path: 'vendor6',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
          }
        ]
      },
      {
        path: 'vendor7',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../reviews/reviews.module').then(m => m.ReviewsPageModule)
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
export class VendorPageRoutingModule {}
