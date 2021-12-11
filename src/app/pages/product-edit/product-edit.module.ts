import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule} from 'ngx-quill'
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class ProductEditModule { }
