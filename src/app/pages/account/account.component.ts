import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VendorComponent } from '../vendor/vendor.component';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router) { 
    this.menuController.enable(true);
  }

  ngOnInit() {}
  // go to checkout page function
  async openVendorPage() {
    const modal = await this.modalController.create({
      component: VendorComponent
    });
    return await modal.present();
  }
  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
  
}
