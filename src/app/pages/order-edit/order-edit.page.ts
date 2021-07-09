import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import {ProductsService} from '../../services/products.service';
import { StatusesService } from '../../services/statuses.service';
import { OrdersService } from '../../services/orders.service';
import {AutoCompleteDataService} from "../../services/auto-complete-data.service";
import { UpdateOrder, UpdateProduct } from '../order-details/order-details.actions';
import { Toast } from '@ionic-native/toast/ngx';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.page.html',
  styleUrls: ['./order-edit.page.scss'],
})
export class OrderEditPage implements OnInit {
  checkDiscount: boolean;
  checkShippingRate: boolean;
  checkManualTaxRates: boolean;
  order: any;
  products: any[];
  statuses: any;
  isLoaded: boolean;
  constructor(private statusesService: StatusesService,private toast: Toast,private autoCompleteDataService: AutoCompleteDataService,private productsService: ProductsService, private ordersService: OrdersService, private store:Store<{currentOrder: object,currentProducts: Product[]}>,private route: ActivatedRoute,private router: Router) { 
      this.checkDiscount = false;  
      this.checkManualTaxRates = false;
    this.store.select('currentOrder').subscribe(result=>{
        this.getStatuses();
        this.order= JSON.parse(JSON.stringify(result));
      });
      this.store.select('currentProducts').subscribe(result=>{
        this.products = JSON.parse(JSON.stringify(result));
        this.isLoaded = true;
      });

  }

  handleProductsListChanged = function (event) {
      this.productsService.getProductById(event.id).then(res=>{
        this.products.push(res);
        this.store.dispatch(UpdateProduct({
          currentProducts: this.products
        }))
      })
}
  removeProduct(product_id){
    this.products = this.products.filter(product=> product.product_id !== product_id)
    console.log(this.products);
    this.store.dispatch(UpdateProduct({
      currentProducts: this.products
    }))
  }

  saveChanges() {
    // console.log({...this.products});
    this.ordersService.updateOrderDetail(this.order.order_id,{
      "notes": this.order.notes,
      "details":this.order.details,
      "discount":this.order.discount,
      "notify_user": "1",
      "notify_department": "1",
      "notify_vendor": "1",
      "shipping":[{
        "rate": this.order.shipping[0].rate
      }],
      "products": {...this.products}
     }).then(_=>{
       //TODO
        this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
     });

  //  this.products.forEach(product=>{
  //   this.productsService.updateProduct(product.product_id,{
  //     "amount": product.amount,
  //     "price": product.price,
  //   });
  //  })
  }
  cancel() {
    this.router.navigate(['../'],{
      relativeTo: this.route,
    }).then(()=>{
      window.location.reload();
    });
    // var to = this.router.url.lastIndexOf('/');
    // to = to == -1 ? this.router.url.length : to + 1;
    // const parentURL =  "/" + this.router.url.substring(0, to);
    // console.log(parentURL);
    // console.log(this.router.url);
    // this.router.navigateByUrl(parentURL);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  getStatuses(){
    this.statusesService.getStatuses().then(res=>{
      this.statuses = res;
    })
  }

  ngOnInit() {
    
  }

  public getImage(obj) {
    if(Object.values(obj)[0] != null)
    return Object.values(obj)[0]["detailed"]["image_path"];
    else
    return "https://placeimg.com/150/300/any";
  };

}
