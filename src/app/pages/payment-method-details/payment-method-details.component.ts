import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentsService } from 'src/app/services/payments.service';
@Component({
  selector: 'app-payment-method-details',
  templateUrl: './payment-method-details.component.html',
  styleUrls: ['./payment-method-details.component.scss'],
})
export class PaymentMethodDetailsComponent implements OnInit {
  payments : any;
  @Input() id:number;
  constructor(private modalController: ModalController,
              private paymentsService: PaymentsService) { }

  ngOnInit() {
    this.getPaymentsById(this.id);
  }

  getPaymentsById(id){
    console.log(id);
    this.paymentsService.getPaymentById(id).then(res=>{
      this.payments = res;
      console.log(this.payments)
    })
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
