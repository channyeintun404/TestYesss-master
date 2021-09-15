import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment.model';

@Component({
  selector: 'app-shippings',
  templateUrl: './shippings.component.html',
  styleUrls: ['./shippings.component.scss'],
})
export class ShippingsComponent implements OnInit {

  //shipment
  shipments:Shipment[];
  shipment:Shipment;

  constructor(
    private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.getAllShipment();
  }

  //get all shipment
  getAllShipment(){
    this.shipmentsService.getAllShipment().then(res=>{
      this.shipments=[];
      Object.values(res).forEach(element => {
        this.shipments.push(element)
      });
    })
    console.log(this.shipments);
  }

  getShipmentById(id){
    this.shipmentsService.getShipmentById(id).then(res=>{

      console.log(res['shipment_id'])
      // this.shipment.shipment_id
      // this.shipment.shipment_timestamp=res['shipment_timestamp'];
      // this.shipment.comments=res['comments'];
      // this.shipment.order_id=res['order_id'];
      // this.shipment.status=res['status'];
      // this.shipment.order_timestamp=res['order_timestamp'];
      // this.shipment.s_firstname=res['s_firstname'];
      // this.shipment.s_lastname=res['s_lastname'];
      // this.shipment.company=res['company'];
      // this.shipment.user_id=res['user_id'];
      // this.shipment.shipping_id=res['shipping_id'];
      // this.shipment.shipping=res['shipping'];
      // this.shipment.carrier=res['carrier'];
    })
  }

    // Go to detail shipment page
    // async goToProductDetails(product) {
    //   const modal = await this.modalController.create({
    //     component: ProductDetailsComponent,
    //     componentProps: product
    //   });
    //   return await modal.present();
    // }

}
