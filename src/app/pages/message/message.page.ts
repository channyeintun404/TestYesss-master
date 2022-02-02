import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  message_hidden: boolean =false;
  messageLists: any;
  msgLists: any[];
  unique_customerid: any[];
  unique_customername: any[];
  name: any;
  date: any;
  message: any;
  customer_id: any;
  show_msg_list:any=[]
  unique_customer_email: any[];
  unique_customer_phone: any[];
  constructor(public modalController: ModalController,
    private productsService: ProductsService, private location: Location) { }

    ngOnInit() {
      this.getAllMessageList();
       
     }
     getAllMessageList(){
      this.productsService.messageLists().then(res=>{
        console.log(res);
        this.msgLists = [];
        const customerIdList = [];
        const customer_name_List = [];
        const customer_email_List = [];
        const customer_phone_List = [];
        for (const message of Object.values(res)){
          console.log(message)
          this.msgLists.push(message)
          customerIdList.push(message['customer_id'])
          customer_name_List.push(message['name'])
          customer_email_List.push(message['email'])
          customer_phone_List.push(message['phone'])
        }
        // let a = ["1", "1", "2", "3", "3", "1"];
        this.unique_customerid = customerIdList.filter((item, i, ar) => ar.indexOf(item) === i);
        this.unique_customername = customer_name_List.filter((item, i, ar) => ar.indexOf(item) === i);
        this.unique_customer_email = customer_email_List.filter((item, i, ar) => ar.indexOf(item) === i);
        this.unique_customer_phone = customer_phone_List.filter((item, i, ar) => ar.indexOf(item) === i);
        for (const message of this.unique_customername){
          this.show_msg_list.push(false)
        }
        console.log(this.msgLists)
        console.log(customerIdList)
        console.log(this.unique_customer_email)
        console.log(this.unique_customer_phone)
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
  
    MessageCheckHidden(id){
      if(this.show_msg_list[id]){
        this.show_msg_list[id]=false;
      }else{
        this.show_msg_list[id]=true;
      }
    }
    back(): void {
      this.location.back()
    }

}
