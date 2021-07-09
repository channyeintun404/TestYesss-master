import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderEditPageRoutingModule } from './order-edit-routing.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { Toast } from '@ionic-native/toast/ngx';

import { OrderEditPage } from './order-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderEditPageRoutingModule,
    AutoCompleteModule,
    
  ],
  providers: [
    Toast
  ],
  declarations: [OrderEditPage]
})
export class OrderEditPageModule {}
