import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit  {

  notifications: any = [];
  noti_count: number=0;
  constructor(private menuController: MenuController,
    private notificationsService: NotificationsService) {
    this.menuController.enable(true); // Enable side menu
  }

  ngOnInit() {
    this.getAllNotification();
  }
  
  getAllNotification(){
    this.notificationsService.getAllNotification().then(res=>{
      this.notifications=[];
      Object.values(res).forEach(element => {
           this.notifications.push(element)
           this.noti_count = this.noti_count+1;
      });
      console.log(this.notifications);
    })
  }

}
