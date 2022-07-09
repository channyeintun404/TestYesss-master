/**
 * Home Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  products: Product[];
  companyId: string;
  out_of_stock: number=0;
  active_product: number=0;
  orders: Order[];
  order_count: number =0;
  inactive_product: number =0;
  order_count_item=["O","F"]
  current_balance: number=0;
  
  constructor(private modalController: ModalController,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId'); 
    this.getProductList();    
    this.getAllOrders("");
   }

     // Get List of Products
  getProductList() {  
    this.productsService.getProducts('',this.companyId).then((resp: any) => {
      console.log(resp);
        resp.forEach(element => {
          if(element.quantity==0){
            this.out_of_stock += 1;
            //  this.active_product+=1;
           }
           if(element.status=='A'){
            this.active_product+=1;
           }else{
            this.inactive_product +=1;
           }
        });
      });    
    }
    //get all orders not inclucde pagenation
    getAllOrders(queryString){
      this.ordersService.getAllOrders(queryString, this.companyId).then((res: any) => {
        console.log(res)
        for (const order of Object.values(res['orders'])) {
          if(this.order_count_item.includes(order['status'])){
            this.order_count +=1;
          } 
          this.current_balance += Number(order['total']);        
        }  
      })
    }
    // Go to cart page
    async gotoCartPage() {
      const modal = await this.modalController.create({
        component: CartComponent
      });
      return await modal.present();
    }
  }
