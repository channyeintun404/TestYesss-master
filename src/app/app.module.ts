import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { currentOrderReducer, currentProductsReducer } from './pages/order-details/order-details.reducer';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import {productListReducer} from './pages/products/products.reducer';
import { orderListReducer } from './pages/orders/orders.reducer';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@NgModule({
  declarations: [AppComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent],
  entryComponents: [ProductDetailsComponent,
    CartComponent,
    CheckoutComponent],
  imports: [AutoCompleteModule,BrowserModule,StoreModule.forRoot({ currentOrder: currentOrderReducer,
     currentProducts: currentProductsReducer,
     productList: productListReducer,
     orderList: orderListReducer,
  }), IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
     IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    Camera,
    File,
    WebView,
    FilePath
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
