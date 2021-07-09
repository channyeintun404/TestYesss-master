/**
 * Deal Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
})
export class DealComponent implements OnInit {

  deals: any = [];

  constructor(private dealsService: DealsService,
    private modalController: ModalController) { }

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

}
