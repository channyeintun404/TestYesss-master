import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-shipping-method-detail',
  templateUrl: './shipping-method-detail.component.html',
  styleUrls: ['./shipping-method-detail.component.scss'],
})
export class ShippingMethodDetailComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
