/**
 * Filter Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

 import { Component, OnInit ,Input} from '@angular/core';
 import { ModalController } from '@ionic/angular';
 import { ProductsComponent } from '../products/products.component'; 
import { Router } from '@angular/router';
 
 @Component({
   selector: 'app-filter',
   templateUrl: './filter.component.html',
   styleUrls: ['./filter.component.scss'],
 })
 export class FilterComponent implements OnInit {


   priceRange: any;
   filter: boolean;
   colors: any = ["#CECE45", "#F951E2", "#CF0114"];
   sizes: any = ["S", "M", "L", "XL"];
   brands: any = ["Gucci", "Chanel", "Louis Vuitton", "Hermès", "Nike", "Prada"];
 
   constructor(public modalController: ModalController,private router: Router) { }
 
   ngOnInit() {
     this.configure();
   }
 
   configure() {
     
   }
 
   
  // Open Filter page
//   async goToProductWithFilter(priceRange) { 
//    console.log(priceRange);
//    const modal = await this.modalController.create({
//      component: ProductsComponent,
//     //  componentProps:  { priceRange: priceRange, filter: true }
//    });  
//    return await modal.present();
//  }

goToProductWithFilter(priceRange) {
  this.router.navigate(['/tabs/products/',priceRange]);
  this.dismiss();
}


   dismiss() {
     this.modalController.dismiss({
       'dismissed': true
     })
   }
 
 }
 