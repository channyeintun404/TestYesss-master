import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ShippingsService } from 'src/app/services/shippings.servicre';
import { Shipping } from 'src/app/models/shipping.model';
import { ShippingMethodDetailComponent } from '../shipping-method-detail/shipping-method-detail.component';
@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.page.html',
  styleUrls: ['./shipping-method.page.scss'],
})
export class ShippingMethodPage implements OnInit {

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location, private shippingService: ShippingsService,) { 
    this.menuController.enable(true);
  }

  active_shipping: Shipping[];
  ngOnInit() {
    this.getShippings();
  }
  // get Shipping
  getShippings() {
    this.shippingService.getAllShipping().then(res=>{
      this.active_shipping=[];
      Object.values(res).forEach(element => {
        if(element["status"]=="A"){
           this.active_shipping.push(element)
        }
      });
      console.log(this.active_shipping);
    })
   }


   async goShippingMethodDetail(id) {
    console.log(id)
    const modal = await this.modalController.create({
      component: ShippingMethodDetailComponent,
      componentProps: { id: id }
    });
    return await modal.present();
  }

   changeSetting(value, shipping_id){
    console.log(shipping_id)
   if(value=="V"){
     this.goShippingMethodDetail(shipping_id);
   }
   this.getShippings();
 }


  back(): void {
    this.location.back()
  }

}
