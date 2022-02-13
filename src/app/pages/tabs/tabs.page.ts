import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit  {

  notifications: any = [];
  noti_count: string;
  constructor(private menuController: MenuController,
    private notificationsService: NotificationsService,
    private cookieService: CookieService) {
    this.menuController.enable(true); // Enable side menu
  }

  ngOnInit() {
    //this.getAllNotification();
    this.noti_count = this.cookieService.get("noti_count")
    console.log (this.noti_count)
  }
  
  // getAllNotification(){
  //   this.notificationsService.getAllNotification().then(res=>{
  //     this.notifications=[];
  //     Object.values(res).forEach(element => {
  //          //this.notifications.push(element)
  //          if(element.active){
  //           this.noti_count = this.noti_count+1;
  //          }
           
  //     });
  //     console.log(this.notifications);
  //   })
  // }

}
