import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProductEditModule { }
