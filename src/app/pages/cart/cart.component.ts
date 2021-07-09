
/**
 * Cart Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */


import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Product } from '../../models/product.model';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];
  total: number = 0;

  constructor(public modalController: ModalController,
    public storageService: StorageService) { }

  ngOnInit() {
    this.getCartItems();
  }

  // Get Cart Items From Storage
  getCartItems() {
    this.storageService.getStorage('my-cart').then((products) => {
      this.cartProducts = products;
      for (var i = 0; i < this.cartProducts.length; i++) {
        this.total += this.cartProducts[i].discountPrice * this.cartProducts[i].quantity;
      }
    });
  }

  // Minus Product Quantity
  minusQuantity(product, index) {
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
      this.total = this.total - product.discountPrice;
    }
  }

  // Add More Quantity
  addQuantity(product, index) {
    if (product.quantity) {
      product.quantity = product.quantity + 1;
    } else {
      product.quantity = 1;
      product.quantity = product.quantity + 1;
    }
    this.total = this.total + product.discountPrice;
  }

  // Remove Product From Cart
  removeProduct(product, index) {
    this.cartProducts.splice(index, 1);
    this.storageService.removeStorageValue(product.id, 'my-cart');
    this.getCartItems();
    this.total = this.total - (product.discountPrice * product.quantity);
  }

  // Go to checkout page
  async goToCheckout() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: CheckoutComponent
    });
    return await modal.present();
  }

  // Back to previous page options
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
