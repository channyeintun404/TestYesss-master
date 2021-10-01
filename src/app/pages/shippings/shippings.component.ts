import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment.model';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { OrderDetailsPage } from '../order-details/order-details.page';
import { ShippingsService } from 'src/app/services/shippings.servicre';
@Component({
  selector: 'app-shippings',
  templateUrl: './shippings.component.html',
  styleUrls: ['./shippings.component.scss'],
})
export class ShippingsComponent implements OnInit {
  //shipment
  shipments:Shipment[];
  shipment:Shipment;
  deleteRow:boolean;

  constructor(
    private shipmentsService: ShipmentsService,
    public modalController: ModalController,private router: Router,protected http: HttpClient,
    private shippingsService: ShippingsService) { }

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
    async goShipmentDetailPage(id) {
      console.log(id)
      const modal = await this.modalController.create({
        component: ShipmentDetailsComponent,
        componentProps: { id: id }
      });
      return await modal.present();
    }

    changeSetting(value, shipment_id){
       console.log(shipment_id)
      if(value=="D"){
        this.shipmentsService.deleteShipment(shipment_id).then(res=>{
          console.log(res);
        })
       
      }
      if(value=="V"){
        this.goShipmentDetailPage(shipment_id);
      }
      if(value=="P"){
      //  this.clickTab;
      // this.router.navigate([`http://yesss.com.mm/admin.php?dispatch=shipments.packing_slip&shipment_ids[]=27`]);
      window.open('http://yesss.com.mm/admin.php?dispatch=shipments.packing_slip&shipment_ids[]=' + shipment_id, "_blank");
      }
      this.getAllShipment();
    }
    
}
