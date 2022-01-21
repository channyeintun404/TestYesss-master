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
          resolve(res);
          },err=>{
              console.log("Payment List Error!!");
            });
        })
      }
      getPaymentById(id) {
        return new Promise((resolve)=>{
          this.get(id).subscribe(paymentsDetail=> {
            console.log(paymentsDetail) 
          resolve(paymentsDetail);
          },err=>{
              console.log("Payments List ERROR");
            });
        })
      }
}