import { Component, Input, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss'],
})
export class ShipmentDetailsComponent implements OnInit {
  @Input() id:number
  shipment : any
  constructor(private shipmentsService: ShipmentsService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.getShipmentById(this.id);
  }
  getShipmentById(id){
    console.log(id);
    this.shipmentsService.getShipmentById(id).then(res=>{
      this.shipment = res;
      // console.log(res['shipment_id'])
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
