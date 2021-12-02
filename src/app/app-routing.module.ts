import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// All Routes (Without Tabs)
// Note (Found others routes at tabs/tabs-routing.module.ts)
const routes: Routes = [
  { path: '', redirectTo: 'onbroading', pathMatch: 'full' },
  { path: 'onbroading', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule) },
  { path: 'landing', loadChildren: () => import('./pages/auth/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'signin', loadChildren: () => import('./pages/auth/signin/signin.module').then(m => m.SigninModule) },
  { path: 'forget-password', loadChildren: () => import('./pages/auth/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: 'verification', loadChildren: () => import('./pages/auth/verification/verification.module').then(m => m.VerificationModule) },
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'order-details/:id',  loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule)},
  { path: 'order-details/:id/edit',  loadChildren: () => import('./pages/order-edit/order-edit.module').then( m => m.OrderEditPageModule)},
  {
    path: 'order-edit',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountModule)
  },
  { path: 'orders-tab', loadChildren: () => import('./pages/orders-tab/orders-tab.module').then(m => m.OrdersTabPageModule) },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'vendor-admin',
    loadChildren: () => import('./pages/vendor-admin/vendor-admin.module').then( m => m.VendorAdminPageModule)
  },
  {
    path: 'vendor-plan',
    loadChildren: () => import('./pages/vendor-plan/vendor-plan.module').then( m => m.VendorPlanPageModule)
  },
  {
    path: 'accounting',
    loadChildren: () => import('./pages/accounting/accounting.module').then( m => m.AccountingPageModule)
  },
  {
    path: 'shipping-method',
    loadChildren: () => import('./pages/shipping-method/shipping-method.module').then( m => m.ShippingMethodPageModule)
  },
  {
    path: 'payment-methods',
    loadChildren: () => import('./pages/payment-methods/payment-methods.module').then( m => m.PaymentMethodsPageModule)
  },
  {
    path: 'vendor', loadChildren: () => import('./pages/vendor/vendor.module').then( m => m.VendorPageModule)
  },
  {
    path: 'description',
    loadChildren: () => import('./pages/description/description.module').then( m => m.DescriptionPageModule)
  },
  {
    path: 'logos',
    loadChildren: () => import('./pages/logos/logos.module').then( m => m.LogosPageModule)
  },
  {
    path: 'method-shipping',
    loadChildren: () => import('./pages/method-shipping/method-shipping.module').then( m => m.MethodShippingPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },

  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.module').then( m => m.GeneralPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },











  // {
  //   path: 'products/:priceRange/:cid',
  //   loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsModule)
  // }
 

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
