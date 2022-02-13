/**
 * Main App Components
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 * 
 */

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PagesService } from './services/pages.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationsService } from './services/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  noti_count: any=0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private router: Router,
    private pagesService: PagesService,
    private cookieService: CookieService,
    private notificationsService: NotificationsService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Get Menus For Side Menu
      this.appPages = this.pagesService.getPages();
    });
    this.getAllNotification();
  }

  // Signout Button
  signout() {
    if(confirm("Are you sure want to logout!!")) {
      this.cookieService.deleteAll();
      this.router.navigate(['/onbroading']);
      this.menuController.enable(false);
    }
  }

  getAllNotification(){
    this.notificationsService.getAllNotification().then(res=>{
      Object.values(res).forEach(element => {
           //this.notifications.push(element)
           if(element.active){
            this.noti_count = this.noti_count+1;
           }
           
      });
    console.log("noti count form app"+this.noti_count)
    this.cookieService.set('noti_count',this.noti_count);
    })
  }
}
