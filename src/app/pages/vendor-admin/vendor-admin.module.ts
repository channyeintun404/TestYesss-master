import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorAdminPageRoutingModule } from './vendor-admin-routing.module';

import { VendorAdminPage } from './vendor-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorAdminPageRoutingModule
  ],
  declarations: [VendorAdminPage]
})
export class VendorAdminPageModule {}
