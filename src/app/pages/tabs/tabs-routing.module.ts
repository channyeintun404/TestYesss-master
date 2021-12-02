import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Tab Routes
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomeModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../deal/deal.module').then(m => m.DealModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../orders-tab/orders-tab.module').then(m => m.OrdersTabPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notification/notification.module').then(m => m.NotificationModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountModule)
          }
        ]
      },
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../vendor/vendor.module').then(m => m.VendorPageModule)
          }
        ]
      },
      {
        path: 'tab7',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../category/category.module').then(m => m.CategoryModule)
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../products/products.module').then(m => m.ProductsModule)
          }
        ]
      },
      {
        path: 'products/:cid',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../products/products.module').then(m => m.ProductsModule)
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../orders-tab/orders-tab.module').then(m => m.OrdersTabPageModule)
          }
        ]
      },
      {
        path: 'vendor',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../vendor/vendor.module').then(m => m.VendorPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
