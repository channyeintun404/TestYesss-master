import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  } from '@angular/router';
import { Order } from "../models/order.modal";
import { AppService } from './app.service';
import { BehaviorSubject,Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isEmpty } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UpdateProduct} from "../pages/order-details/order-details.actions";
import { query } from '@angular/animations';
import { UpdateOrderList } from '../pages/orders/orders.actions';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class OrdersService extends AppService {

  orders: Order[];
  constructor(protected http: HttpClient, private store:Store<{products: number,orderList: Order[]}>) {
    super(http);
    this.setModel('orders');
  }

  getAllOrders(queryString, vendorId){
    return new Promise((resolve)=>{
      this.getByQueryString(queryString+"items_per_page=10&company_id="+vendorId+"$sortBy=order_id&sort_order=desc").subscribe(res=> {
        console.log(res['orders'])        
        resolve(res);
      })
    })
  }

  getOrders(queryString, vendorId) {
    return new Promise((resolve) => {
        this.getByQueryString(queryString+"items_per_page=10&company_id="+vendorId+"$sortBy=order_id&sort_order=desc").subscribe(res=> {
          console.log(res)
          let orderLength = res['orders'].length;
          let completedOrderLength = 0;
          let completedOrderLength$ =new BehaviorSubject<number>(0);
          this.orders= [];
          for(const order of res['orders']) {
              // Get Order Details to get List of products
              let quantity:number = 0;
              this.get(order["order_id"]).subscribe(subRes=>{
                // Get Amount from each product
                  
                Object.keys(subRes.products).forEach(
                  key =>{
                    quantity += parseInt(subRes.products[key].amount);
                  }
                );

                //tracking number can only be expected from Shipment API So We need to change modal to Shipment
                this.setModel("shipments")
                if (subRes["shipment_ids"] === undefined || subRes["shipment_ids"].length == 0) {
                    this.orders.push({
                    id:order["order_id"],
                    trackingNumber: "None",
                    quantity: quantity,
                    totalPrice: order["total"],
                    date: order["timestamp"]
                 });   
                 completedOrderLength$.next(++completedOrderLength);
              }
              else {
                  for(let shipment_id in subRes["shipment_ids"]) {
                    let tracking_number = "";
                    this.get(shipment_id).subscribe(shipmentRes =>{         
                            Object.keys(shipmentRes.shipments).forEach(
                              key =>{
                                tracking_number = `${tracking_number},${shipmentRes.shipments[key].tracking_number}`;
                              }
                            ); 
                            tracking_number = tracking_number.substring(1);
                    },
                    err => console.log("erorr occured"),
                    () =>{
                          this.orders.push({
                              id:order["order_id"],
                              trackingNumber:tracking_number,
                              quantity: quantity,
                              totalPrice: order["total"],
                              date: order["timestamp"]
                          });    
                          completedOrderLength$.next(++completedOrderLength);                  
                    });
                  }
                }
                this.setModel('orders');  
              })
          }
          completedOrderLength$.asObservable().subscribe(count=>{
            if (count == orderLength){
              this.orders.sort((a,b)=>b.id-a.id);
              resolve(this.orders);
            }
          })
         
        })
    })
  }



  getOrderDetailById(id) {
    return new Promise((resolve)=> {
      if(id!=null){
        this.get(id).subscribe(orderDetail=>{
          resolve(orderDetail);
        },
        err=>{
          resolve(null);
        },()=>{

        })
      }
    })
  }
  getMessageById(order_id) {
    return new Promise((resolve) => {
      if(order_id!=null){
        this.getOptionByQueryString('discussions&object_type=o&object_id=' + order_id).subscribe(res => {
          console.log(res);
          resolve(res);
         });
      }
    });
  }
  updateOrderDetail(id,data){
    console.log(data);
    return new Promise((resolve)=>{
      this.edit(id,data).subscribe(res=>{
        console.log(res);
      })
    })
  }
}

