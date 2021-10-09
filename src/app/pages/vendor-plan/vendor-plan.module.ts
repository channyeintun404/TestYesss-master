import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorPlanPageRoutingModule } from './vendor-plan-routing.module';

import { VendorPlanPage } from './vendor-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorPlanPageRoutingModule
  ],
  declarations: [VendorPlanPage]
})
export class VendorPlanPageModule {}
