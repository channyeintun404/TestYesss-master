import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends AppService {

    constructor(protected http: HttpClient) {
        super(http);
        this.setModel('payments');
      }

      getAllPayments() {
        return new Promise((resolve)=>{
          this.getAllWithoutParams().subscribe(res=> {
            console.log(res)
          //   for(const shipping of res["shippings"]){
          //     this.shipping.push({
          //       shipping_id :shipping["shipping_id"],
          //       min_weight:shipping["min_weight"],
          //       max_weight:shipping["max_weight"],   
          //       position:shipping["position"],
          //       status:shipping["status"],
          //       shipping: shipping["shipping"],
          //       delivery_time:shipping["delivery_time"],
          //       usergroup_ids: shipping["usergroup_ids"],
          //   });
          // }
          resolve(res);
          },err=>{
              console.log("Payment List Error!!");
            });
        })
      }
}