import { Component, OnInit } from '@angular/core';
import { custom } from '@cloudinary/base/qualifiers/region';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-product-messages',
  templateUrl: './product-messages.component.html',
  styleUrls: ['./product-messages.component.scss'],
})
export class ProductMessagesComponent implements OnInit {
  message_hidden: boolean =false;
  messageLists: any;
  msgLists: any[];
  unique_customerid: any[];
  unique_customername: any[];
  name: any;
  date: any;
  message: any;
  customer_id: any;
  constructor(public modalController: ModalController,
    private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.messageLists().then(res=>{
      console.log(res);
      this.msgLists = [];
      const customerIdList = [];
      const customer_name_List = [];
      for (const message of Object.values(res)){
        console.log(message)
        this.msgLists.push(message)
        customerIdList.push(message['customer_id'])
        customer_name_List.push(message['name'])
        // this.discussionNameArray.push(discussion['name'])
      }
      // let a = ["1", "1", "2", "3", "3", "1"];
      this.unique_customerid = customerIdList.filter((item, i, ar) => ar.indexOf(item) === i);
      this.unique_customername = customer_name_List.filter((item, i, ar) => ar.indexOf(item) === i);
      
      console.log(this.unique_customerid);
      console.log(this.msgLists)
      console.log(customerIdList)
    })
    
  }

  createProductMessage(){
    this.productsService.createProductMessage({
      "name": this.name,
      "date": this.date,
      "message": this.message,
      "customer_id": this.customer_id
    }).then((resp: any) => {
      console.log(resp)
   })
  }

  MessageCheckHidden(customer_id){
    if(this.message_hidden){
      this.message_hidden=false
    }else{
      this.message_hidden=true
    }
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
