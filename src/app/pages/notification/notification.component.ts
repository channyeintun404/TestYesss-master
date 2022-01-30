/**
 * Notification Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notifications: any = [];

  constructor(private notificationsService: NotificationsService,
    private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.getAllNotification();
  }

  // Get list of notification
  // getNotification() {
  //   this.notifications = this.notificationsService.getNotifications();
  // }

  getAllNotification(){
    this.notificationsService.getAllNotification().then(res=>{
      this.notifications=[];
      
      Object.values(res).forEach(element => {
           this.notifications.push(element)
      });
      console.log(this.notifications);
    })
  }

  godestionation(id){
    this.router.navigate([`/order-details/`+id]);
  }

  // Go to cart page
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
}
