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
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

// import { Camera } from '@ionic-native/Camera/ngx';
// import { File } from '@ionic-native/File/ngx';
// import { WebView } from '@ionic-native/ionic-webview/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import {CloudinaryModule} from '@cloudinary/angular';
import { ShipmentDetailsComponent } from './pages/shipment-details/shipment-details.component';
import { CookieService } from 'ngx-cookie-service';
import { ReviewDetailsComponent } from './review-details/review-details.component';

@NgModule({
  declarations: [AppComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    CartComponent,
    CheckoutComponent,
    ShipmentDetailsComponent,
  ReviewDetailsComponent],
  entryComponents: [ProductDetailsComponent,
    ProductEditComponent,
    CartComponent,
    CheckoutComponent,
    ShipmentDetailsComponent,
    ReviewDetailsComponent],
  imports: [AutoCompleteModule,BrowserModule,StoreModule.forRoot({ currentOrder: currentOrderReducer,
     currentProducts: currentProductsReducer,
     productList: productListReducer,
     orderList: orderListReducer,
     
  }), IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CloudinaryModule,
     IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    ImagePicker,
    MediaCapture,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
