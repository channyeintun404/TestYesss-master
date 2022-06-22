import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.page.html',
  styleUrls: ['./orders-tab.page.scss'],
})
// export class OrdersTabPage implements OnInit {

//   constructor(private router: Router,private modalController: ModalController,) { }

//   ngOnInit() {
//   }
  // gotoOrderPage() {
  //   this.router.navigate(['/tabs/orders']);
  // }
export class OrdersTabPage {

  constructor(private menuController: MenuController, private router: Router,
    public events: Events) {
    this.menuController.enable(true); // Enable side menu
  }

  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    if(tabPath=="/tabs/tab3/orders-tab3"){
      this.events.publish('refresh_shipments');
    }
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
}
