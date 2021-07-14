import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { FilterComponent } from '../filter/filter.component';
import { ProductDetailsComponent } from './product-details.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductDetailsComponent
      }
    ])
  ],
  declarations: [ProductDetailsComponent]
})
export class ProductDetailsModule { }
