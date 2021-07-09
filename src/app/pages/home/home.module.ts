import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { HotDealsComponent } from '../../components/hot-deals/hot-deals.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { HomeTopSliderComponent } from '../../components/home-top-slider/home-top-slider.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent,
    SearchComponent,
    FeaturedProductsComponent,
    HotDealsComponent,
    CategoriesComponent,
    HomeTopSliderComponent,
    SearchbarComponent],
  entryComponents: [SearchComponent]
})
export class HomeModule { }
