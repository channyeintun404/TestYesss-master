import { Component,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { UsergroupsService } from '../../services/usergroups.service';
import { StatusesService } from '../../services/statuses.service';
import { MenuController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { IonSelect,IonButton } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { UpdateProduct, UpdateOrder} from "../order-details/order-details.actions";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  @ViewChild('settingList',{static: false}) settingListRef: IonSelect;
  @ViewChild('prev',{static:false}) prevBtnRef: IonButton;
  @ViewChild('next',{static:false}) nextBtnRef: IonButton;

   orderid: string;
   previd: string;
   nextid: string;
   currentStatus: string;
   order: any;
   products: any[] = [];
   statuses: any;
   isLoaded = false;
   needReload = false;

  constructor(public menuCtrl: MenuController,private store:Store<{currentOrder: object}>,private statusesService: StatusesService, private productsService: ProductsService, private ordersService: OrdersService,private usergroupsService:UsergroupsService,private route: ActivatedRoute,private router: Router) {
    this.route.params.subscribe( params => {
      this.orderid = params.id;
      this.previd = (parseInt(params.id) + 1).toString();
      this.nextid = (parseInt(params.id) - 1).toString();
    });
   }

  openSetting() {
    this.settingListRef.open();
  }
  ngOnInit() {
    this.getOrderById(this.orderid);
    this.getStatuses();
    this.checkAdjecentOrders();
    this.getManagers();
    // this.store.select('currentOrder').subscribe(result=>{
    //   console.log('count - ',Object.keys(result).length)
    //   if(Object.keys(result).length == 0){
    //     console.log('reload done');
    //   }
    // });
    // if(this.needReload) {
     
      
    // }
  }
  getManagers(){
    this.usergroupsService.getUserGroups("usergroup_id=6&");
  }
  checkAdjecentOrders(){
      //check previous Order
      this.ordersService.getOrderDetailById(this.previd).then(res=>{
              if(res == undefined) {
                this.prevBtnRef.disabled = true;
              }
      })

      //check Next Order
      this.ordersService.getOrderDetailById(this.nextid).then(res=>{
        if(res == undefined) {
          this.nextBtnRef.disabled =true;
        }
})
  }
  saveChanges(){
    this.ordersService.updateOrderDetail(this.orderid,{
      "status": this.currentStatus,
      "notes": this.order.notes,
      "details":this.order.details,
     });
      this.store.dispatch(UpdateOrder({
            currentOrder: this.order,
          }));
  }

  getOrderById(id){
      this.ordersService.getOrderDetailById(id).then( res=>{
        console.log(res);
          this.order = res;
          this.currentStatus = res["status"];
          this.GetProductList(res["products"]);
          this.store.dispatch(UpdateOrder({
            currentOrder: JSON.parse(JSON.stringify(this.order)),
          }));
          this.isLoaded= true;
      });
  }

  changeSetting(value){
        this.store.dispatch(UpdateOrder({
            currentOrder: this.order,
          }));
    if(value === '6'){
      this.router.navigate(['./edit'],{
        relativeTo: this.route,
      });
      this.settingListRef.value = "";
    }
    
    // routerDirection="forward" 
    //         [routerLink]="['/order-details',previd]"
  }

  async GetProductList(obj) {
      await Object.keys(obj).map(async (index)=>{
        let item = obj[index];
        const productDetail =  await this.productsService.getProductById(item.product_id);
        this.products.push(productDetail);
        this.store.dispatch(UpdateProduct({
          currentProducts: JSON.parse(JSON.stringify(this.products))
        }))
  });
}

  getStatuses(){
    this.statusesService.getStatuses().then(res=>{
      this.statuses = res;
    })
  }

  public getImage(obj) {
    if(Object.values(obj)[0] != null)
    return Object.values(obj)[0]["detailed"]["image_path"];
    else
    return "https://placeimg.com/150/300/any";
  };

  public handleCusNotesChange(data) {
    let clonedOrder = JSON.parse(JSON.stringify(this.order));
    this.order = clonedOrder;
    // this.store.dispatch(UpdateOrder({
    //   currentOrder: clonedOrder,
    // }));
  }
}
