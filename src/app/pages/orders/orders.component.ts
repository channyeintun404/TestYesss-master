/**
 * Order Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ModalController } from '@ionic/angular';
import { Order } from '../../models/order.modal';
import { StatusesService } from '../../services/statuses.service';
import { Status } from 'src/app/models/status.modal';
import { Store } from '@ngrx/store';
import { UpdateOrderList } from './orders.actions';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  statuses : any;
  selectedStatus  = "all";
  loadOrderPagesCount = 1;

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
  };

  // Order Options
  options: any = [{
    title: 'Delivered',
    isSelected: true
  }, {
    title: 'Processing',
    isSelected: false
  }, {
    title: 'Cancelled',
    isSelected: false
  },
  {
    title: 'Processing',
    isSelected: false
  }, {
    title: 'Processing',
    isSelected: false
  }, {
    title: 'Processing',
    isSelected: false
  }, ];
orders: Order[];
  vendorId: any;

  // Orders Sample Data
  // orders: any = [{
  //   orderId: '#NPOK8T',
  //   date: '15/11/2020',
  //   trackingNumber: 'AQWNQWEIC',
  //   quantity: 2,
  //   totalPrice: 100
  // }, {
  //   orderId: '#NPORK8T',
  //   date: '20/11/2020',
  //   trackingNumber: 'WNQWEIC',
  //   quantity: 2,
  //   totalPrice: 500
  // }, {
  //   orderId: '#NPOKYY8T',
  //   date: '05/11/2020',
  //   trackingNumber: 'MWNQWEIC',
  //   quantity: 4,
  //   totalPrice: 300
  // }];
  constructor(private ordersService: OrdersService,private statusesService: StatusesService,private store:Store<{orderList: Order[]}>,
    public modalController: ModalController,
    private cookieService: CookieService) { 
    }

  ngOnInit() {
    this.store.select("orderList").subscribe(result=>{
      this.orders = result;
  })
    this.getOrderList("");
    this.getStatuses();
  }
  getOrderList(queryString,callback?:() => void ) {

    this.vendorId=this.cookieService.get('vendorId');  // get the cookie value
    console.log(this.vendorId);

  //get data from service
    this.ordersService.getOrders(queryString, this.vendorId).then((res :Order[])  =>{  
      console.log(res);
      this.store.dispatch(UpdateOrderList({
        Type: "Update",
        OrderList: JSON.parse(JSON.stringify(res))
      }));
      console.log('none callback yet');
      console.log(callback);
      if(callback != undefined){
        console.log('callback');
        callback();
      }
    })
  }

  updateOption(optionStatus,optionalParam = "",callback?: ()=>void) {
    console.log("it works");
    if(optionStatus === "all"){
      this.getOrderList(optionalParam,callback);
    }
    else {
      this.getOrderList("status="+optionStatus+"&"+optionalParam,callback);
    }
  }

  // Change Order Option Function
  changeOption(option, index) {
    this.selectedStatus = option.status;
    //Clear OrderList Before Changing Status
    this.store.dispatch(UpdateOrderList({
      Type: "Clear",
      OrderList:[]
    }));
    this.updateOption(option.status);
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].isSelected = false;
    }
    this.options[index].isSelected = true;
  }
  loadData(event) {
    ++this.loadOrderPagesCount;
    const callBack = () =>
      event.target.complete();

     this.updateOption(this.selectedStatus,"&page="+this.loadOrderPagesCount+"&",callBack);
  }

  getStatuses(){
    this.statusesService.getStatuses().then((res : Status[])=>{
      this.statuses = [{
        status: "all",
        description: "All"
      },...res];
    })
  }
}
