import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shipment } from '../models/shipment.model';
@Injectable({
  providedIn: 'root'
})
export class ShipmentsService extends AppService {

    shipments : Shipment[];
    shipment : Shipment;

    constructor(protected http: HttpClient) {
        super(http);
        this.setModel('shipments');
      }

      getAllShipment() {
        this.shipments=[];
        return new Promise((resolve)=>{
          this.getAllWithoutParams().subscribe(res=> {
            
            for(const shipment of res["shipments"]){
              this.shipments.push({
                shipment_id :shipment["shipment_id"],
                shipment_timestamp :shipment["shipment_timestamp"],
                comments :shipment["comments"],
                order_id :shipment["order_id"],
                status :shipment["status"],
                order_timestamp :shipment["order_timestamp"],
                s_firstname :shipment["s_firstname"],
                s_lastname :shipment["s_lastname"],
                company :shipment["company"],
                user_id :shipment["user_id"],
                shipping_id :shipment["shipping_id"],
                shipping :shipment["shipping"],
                carrier :shipment["carrier"]
            });
          }
          resolve(this.shipments);
          },err=>{
              console.log("Shipments List ERROR");
            });
        })
      }

      getShipmentById(id) {
        return new Promise((resolve)=>{
          this.get(id).subscribe(res=> {
            console.log(res)

            // for(const shipment of res["shipments"]){
            //   this.shipment.push({
            //     shipment_id :shipment["shipment_id"],
            //     shipment_timestamp :shipment["shipment_timestamp"],
            //     comments :shipment["comments"],
            //     order_id :shipment["order_id"],
            //     status :shipment["status"],
            //     order_timestamp :shipment["order_timestamp"],
            //     s_firstname :shipment["s_firstname"],
            //     s_lastname :shipment["s_lastname"],
            //     company :shipment["company"],
            //     user_id :shipment["user_id"],
            //     shipping_id :shipment["shipping_id"],
            //     shipping :shipment["shipping"],
            //     carrier :shipment["carrier"]
            // });
          
          resolve(res);
          },err=>{
              console.log("Shipments List ERROR");
            });
        })
      }
      

}