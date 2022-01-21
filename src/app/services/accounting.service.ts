import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountingService extends AppService {
  accounting: any[];

    constructor(protected http: HttpClient) {
        super(http);
        this.setModel('accounting');
      }
      accountingLists(){
        this.accounting = [
          {
            id: 1,
            status: "completed",
            date: "11/25/2021, 19:57",
            type: "Payout",
            transaction_value:"ks1020",
            comment: "payment for 5 orders"
          },
          {
            id: 2,
            status: "pending",
            date: "11/26/2021, 17:45",
            type: "order#159 placed",
            transaction_value:"ks3500",
            comment: "Payout for the vendor plan: Exclusive Services"
          },
          {
            id: 3,
            status: "completed",
            date: "11/27/2021, 13:57",
            type: "order#157 placed",
            transaction_value:"ks1450",
            comment: "payment for 10 orders"
          }
        ];
        return new Promise((resolve) => {
            resolve(this.accounting);
           });
      }

}