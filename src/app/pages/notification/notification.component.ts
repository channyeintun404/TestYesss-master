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
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notifications: any = [];
  noti_count: any =0;

  constructor(private notificationsService: NotificationsService,
    private modalController: ModalController, private router: Router,
    private cookieService: CookieService) { }

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

  godestionation(item_id, id){    
    this.notifications.forEach(element => {
      if(element.id==id){
        element.active = false;
        this.noti_count = this.noti_count+1;        
      } 
    });
    this.cookieService.delete('noti_count');
    this.cookieService.set('noti_count',this.noti_count);
    this.router.navigate([`/order-details/`+item_id]);
  }

  // Go to cart page
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
}
