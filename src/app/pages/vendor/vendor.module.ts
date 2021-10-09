import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';


@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: VendorComponent
      }
    ])
  ]
})
export class VendorModule { }
