import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersTabPageRoutingModule } from './orders-tab-routing.module';

import { OrdersTabPage } from './orders-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersTabPageRoutingModule
  ],
  declarations: [OrdersTabPage]
})
export class OrdersTabPageModule {}
