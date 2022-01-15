import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaymentsService } from 'src/app/services/payments.service';
@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage implements OnInit {
  payments: any[];

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location,
    private paymentsService: PaymentsService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.getAllPayments();
  }
  getAllPayments(){
    this.paymentsService.getAllPayments().then(res=>{
      console.log(res)
      this.payments = [];
      Object.values(res["payments"]).forEach(element => {
        if(element["status"]=="A"){
          
           this.payments.push(element)
        }
        console.log(element)
      });
      console.log(this.payments)
    })
  }
  back(): void {
    this.location.back()
  }

}
