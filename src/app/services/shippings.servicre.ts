import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shipping } from '../models/shipping.model';
@Injectable({
  providedIn: 'root'
})
export class ShippingsService extends AppService {

    shipping : Shipping[];

    constructor(protected http: HttpClient) {
        super(http);
        this.setModel('shippings');
      }

      getAllShipping() {
        this.shipping=[];
        return new Promise((resolve)=>{
          this.getByQueryString("items_per_page=0").subscribe(res=> {
            
            for(const shipping of res["shippings"]){
              this.shipping.push({
                shipping_id :shipping["shipping_id"],
                min_weight:shipping["min_weight"],
                max_weight:shipping["max_weight"],   
                position:shipping["position"],
                status:shipping["status"],
                shipping: shipping["shipping"],
                delivery_time:shipping["delivery_time"],
                usergroup_ids: shipping["usergroup_ids"],
            });
          }
          resolve(this.shipping);
          },err=>{
              console.log("Shippings List ERROR");
            });
        })
      }
      
      getShippingMethodById(id) {
        return new Promise((resolve)=>{
          this.get(id).subscribe(shippingmethoddetail=> {
            console.log(shippingmethoddetail) 
          resolve(shippingmethoddetail);
          },err=>{
              console.log("shippingmethoddetail List ERROR");
            });
        })
      }

}