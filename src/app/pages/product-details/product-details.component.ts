/**
 * Product Details Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { StorageService } from '../../services/storage.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductsService } from '../../services/products.service';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  @Input() id: number;
  name: String;
  description: String;
  price: number;
  discountPrice: number;
  images: Array<String>;
  size: Array<String>;
  color: Array<String>;
  isWishlist: boolean;

  products: Product;


  //option  
  variantnameArray: any[]=[];

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  constructor(public modalController: ModalController,
    public storageService: StorageService,
    private optionsService : OptionsService,
    private productsService : ProductsService) {
  }

  ngOnInit() {    
    this.getProductById();
    this.getProductOptions();
    this.addToCart();
    console.log(this.name)
  }

  // Add to Cart Function
  addToCart() {
    this.products = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      discountPrice: this.discountPrice,
      images: this.images,
      size: this.size,
      color: this.color,
      quantity: 1,
      isWishlist: this.isWishlist
    }

    // Save cart product in storage
    this.storageService.setStorageValue(this.products, 'my-cart');
  }

  // Go to cart page
  async gotoCartPage() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  async goToProductEditPage(){
    const modal = await this.modalController.create({
      component: ProductEditComponent,
      componentProps: this.products
    });
    return await modal.present();
  }

  getProductById(){
    console.log("id is ="+this.id)
  
    this.productsService.getProductById(this.id).then( res=>{
      console.log(res);
      // console.log("options id "+JSON.stringify(res['option_id']))
      this.name = res['product']
      this.price = res['price']  
    })
  }
 //resetData
 resetPage(){
  this.getProductById()
}

  refreshPage(event){
    this.getProductById()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

//getproductOption
  getProductOptions(){
    
    this.optionsService.getProductsOptions(this.id).then((resp: any) => {

      for (const variants of Object.values(resp)) {
        console.log("***",Object.values(variants['variants']))
         for (const variant of Object.values(variants['variants'])) {
           this.variantnameArray.push(variant['variant_name']);
           } 
      }
      console.log("variant name are" +this.variantnameArray)
    })
  }


  
  // Back to previous page function
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
