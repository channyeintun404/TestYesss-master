import { Component, Input, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { ModalController } from '@ionic/angular';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrls: ['./shipment-details.component.scss'],
})
export class ShipmentDetailsComponent implements OnInit {
  @Input() id:number
  shipment : any;
  order_id : any;
  order : any;
  products: any[] = [];
  currentStatus: string;

  orderid: string;
   previd: string;
   nextid: string;
   product_array : any[]=[];
   statuses: any;
   isLoaded = false;
   needReload = false;
   users_id: any;

  constructor(private shipmentsService: ShipmentsService,
              private modalController: ModalController,
              private ordersService: OrdersService,
              private productsService: ProductsService) { }

  ngOnInit() {
    this.getShipmentById(this.id);
  }
  
  getOrderById(id){
    this.ordersService.getOrderDetailById(id).then( res=>{
      console.log(res);
        this.order = res;
        console.log("order",this.order)
        this.currentStatus = res["status"];
        this.GetProductList(res["products"]);
        this.users_id = res["user_id"]
        // this.store.dispatch(UpdateOrder({
        //   currentOrder: JSON.parse(JSON.stringify(this.order)),
        // }));
        this.isLoaded= true;
    });
}

async GetProductList(obj) {
  await Object.keys(obj).map(async (index)=>{
    let item = obj[index];
    this.product_array.push(item);
    this.product_array.reverse();
    console.log(this.product_array);
    const productDetail =  await this.productsService.getProductById(item.product_id);
    this.products.push(productDetail);
    console.log("products",this.products)
    console.log("product_array", this.product_array);
    // this.store.dispatch(UpdateProduct({
    //   currentProducts: JSON.parse(JSON.stringify(this.products))
    // }))
});
}


  getShipmentById(id){
    console.log(id);
    this.shipmentsService.getShipmentById(id).then(res=>{
      this.shipment = res;
      this.order_id = res['order_id'];
      this.getOrderById(this.order_id);
      console.log(res['order_id'])
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
