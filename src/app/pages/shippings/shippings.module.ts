import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingsRoutingModule } from './shippings-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ShippingsComponent } from './shippings.component';


@NgModule({
  declarations: [ShippingsComponent],
  imports: [
    CommonModule,
    ShippingsRoutingModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path:'',
        component: ShippingsComponent
      }
    ])
  ]
})
export class ShippingsModule { }
