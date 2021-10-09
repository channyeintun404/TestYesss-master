import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {

  constructor(private menuController: MenuController,private modalController: ModalController,) { 
    this.menuController.enable(true);
  }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
