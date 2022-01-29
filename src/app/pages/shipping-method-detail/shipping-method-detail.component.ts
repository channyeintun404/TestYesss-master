import { Component,  Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShippingsService } from 'src/app/services/shippings.servicre';
@Component({
  selector: 'app-shipping-method-detail',
  templateUrl: './shipping-method-detail.component.html',
  styleUrls: ['./shipping-method-detail.component.scss'],
})
export class ShippingMethodDetailComponent implements OnInit {
  shipping_method: unknown;
  @Input() id:number;
  constructor(private modalController: ModalController, private shippingsService: ShippingsService) { }

  ngOnInit() {
    this.getShippingMethodById(this.id);
  }
  // ckeditorContent;
  getShippingMethodById(id){
    this.shippingsService.getShippingMethodById(id).then(res=>{
      this.shipping_method = res;
      console.log(this.shipping_method)
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
