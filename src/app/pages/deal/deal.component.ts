/**
 * Deal Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */
 import {IonContent} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../../services/deals.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
})
export class DealComponent implements OnInit {
  // @ViewChild('scrollElement') content: IonContent;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  deals: any = [];

  constructor(private dealsService: DealsService,
    private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.getDeals();
  }

  // Get list of deals
  getDeals() {
    this.deals = this.dealsService.getDeals();
  }

  // Go to cart page function
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
  // go to checkout page function
  async openCheckoutPage() {
    const modal = await this.modalController.create({
      component: CheckoutComponent
    });
    return await modal.present();
  }
  // Go to order page function
  openOrdersPage() {
    this.router.navigate(['/tabs/orders']);
  }
  // Go to products page function
   openProductsPage() {
    this.router.navigate(['/tabs/products']);
  }
  // Go to category page function
  openCategoryPage() {
    this.router.navigate(['/tabs/categories']);
  }

  // async openCampaignPage() {
  //   const modal = await this.modalController.create({
  //     component: DealComponent
  //   });
  //   return await modal.present();
  // }
// Go to campaign page function
  ScrollToBottom() {
      this.content.scrollToBottom(100);
    }
  // Back to previous screen
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
