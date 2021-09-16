import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment.model';
import { ModalController } from '@ionic/angular';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
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
    private shipmentsService: ShipmentsService,
    public modalController: ModalController) { }

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
    })
  }

    // Go to detail shipment page
    async goShipmentPage(id) {
      console.log(id)
      const modal = await this.modalController.create({
        component: ShipmentDetailsComponent,
        componentProps: { id: id }
      });
      return await modal.present();
    }

}
