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
import { image } from '@cloudinary/base/qualifiers/source';
import { ShippingsService } from 'src/app/services/shippings.servicre';
import { Shipping } from 'src/app/models/shipping.model';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { ModalController } from '@ionic/angular';
import { ShipmentDetailsComponent } from '../shipment-details/shipment-details.component';
import { Shipment } from 'src/app/models/shipment.model';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { MessageDetailsComponent } from '../message-details/message-details.component';
import { async } from '@angular/core/testing';
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
   product_array : any[]=[];
   statuses: any;
   isLoaded = false;
   needReload = false;

   //Shipping
   active_shipping: Shipping[];
   currentShipping: Shipping;
   currentShipping_id: string;
   showBtn: boolean;
   currentShippingName:any;
   users_id: any;
   newShippment_id: any;

     //shipment
  shipments:Shipment[];

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }
  currentShipment: any;
  currentShipmentId: any;
  discussions: any[];
  discussionNameArray: any[];
  user_id: any;
  firstname: any;
  msg_hidden: boolean =false;
  total_hidden: boolean =false;
  tracking_number: any;
  vendorId: number;
  orderIdList: any[];
  isLastOrderId: boolean = false;
  isFirstOrderId: boolean = false;
  currentStautDescription: any;
 
   

  constructor(public menuCtrl: MenuController,
    private store:Store<{currentOrder: object}>,
    private statusesService: StatusesService,
    private shippingService: ShippingsService,
     private productsService: ProductsService,
      private ordersService: OrdersService,
      private usergroupsService:UsergroupsService,
      private route: ActivatedRoute,private router: Router,
      private modalController: ModalController,
      private shipmentsService: ShipmentsService,
      private cookieService: CookieService,
      private usersService: UsersService) {
    this.route.params.subscribe( params => {
      this.orderid = params.id;
      // for (let i = 0; i < this.orderIdList.length; i++) {
      //   if(this.orderIdList[i]==this.orderid){
      //     this.previd = this.orderIdList[i + 1].toString();
      //     this.nextid = this.orderIdList[i - 1].toString();
      //   }
      // }
      // this.previd = (parseInt(params.id) + 1).toString();
      // this.nextid = (parseInt(params.id) - 1).toString();
    });
   }

  openSetting() {
    this.settingListRef.open();
  }
  ngOnInit() {
    this.user_id = this.cookieService.get('userId');
    this.orderIdList = JSON.parse(this.cookieService.get('orderIdList'));
    if(this.orderid==this.orderIdList[0]){
      this.isFirstOrderId = true;
    }
    if(this.orderid==this.orderIdList[this.orderIdList.length-1]){
      this.isLastOrderId = true;
    }
    this.getOrderById(this.orderid); 
    this.getShippings();
    this.checkShipment();
    this.checkAdjecentOrders();
    this.getManagers();
    this.getMessageById();
    this.getStatuses();
  }

  goPreOrder(order_id){
    for (let i = 0; i < this.orderIdList.length; i++) {
      if(this.orderIdList[i]==order_id){
        this.previd = this.orderIdList[i + 1].toString();
      }
    }
    this.router.navigate(['/order-details/'+this.previd]);
  }

  goNextOrder(order_id){
    for (let i = 0; i < this.orderIdList.length; i++) {
      if(this.orderIdList[i]==order_id){
        this.nextid = this.orderIdList[i - 1].toString();
      }
    }
    this.router.navigate(['/order-details/'+this.nextid]);
  }
  
  // get Shipping
  getShippings() {
   this.shippingService.getAllShipping().then(res=>{
     this.active_shipping=[];
     Object.values(res).forEach(element => {
       if(element["status"]=="A"){
          this.active_shipping.push(element)
       }
     });
     console.log(this.active_shipping);
   })
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

    let shipping;
    let delivery_time;
    let min_weight;
    let max_weight;
    this.active_shipping.forEach(element => {
      if(element["shipping_id"]==parseInt(this.currentShipping_id)){
        shipping=element["shipping"];
        delivery_time=element["delivery_time"];
        min_weight=element["min_weight"];
        max_weight=element["max_weight"];
        
        console.log(shipping,delivery_time,min_weight,max_weight);
        // this.currentShipping.shipping=element["shipping"];
        // this.currentShipping.delivery_time=element["delivery_time"];
        // this.currentShipping.min_weight=element["min_weight"];
        // this.currentShipping.max_weight=element["max_weight"];
      }
    });
    this.ordersService.updateOrderDetail(this.orderid,{
      "notes": this.order.notes,
      "details":this.order.details,      
      "product_groups": 
        {
          "chosen_shippings": 
            {
              "shipping_id": this.currentShipping_id,
              "shipping": shipping,
              "delivery_time": delivery_time,
              "min_weight": min_weight,
              "max_weight": max_weight
            }
        }
     });
      this.store.dispatch(UpdateOrder({
            currentOrder: this.order,
          }));
  }

   updateOrderStatus(orderid){
     this.ordersService.updateOrderDetail(orderid,{
      "status": "E",
     }).then(res=>{
     });
      window.location.reload();
  }

  getOrderById(id){
      this.ordersService.getOrderDetailById(id).then( res=>{
        console.log(res);
          this.order = res;
          console.log("order",this.order)
          this.currentStatus = res["status"];
          this.GetProductList(res["products"]);
          this.users_id = res["user_id"]
          this.store.dispatch(UpdateOrder({
            currentOrder: JSON.parse(JSON.stringify(this.order)),
          }));
          this.isLoaded= true;
      });
     this.getStatuses(); 
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
        this.product_array.push(item);
        this.product_array.reverse();
        console.log(this.product_array);
        const productDetail =  await this.productsService.getProductById(item.product_id);
        this.products.push(productDetail);
        console.log("products",this.products)
        this.store.dispatch(UpdateProduct({
          currentProducts: JSON.parse(JSON.stringify(this.products))
        }))
  });
}

  getStatuses(){
    this.statusesService.getStatuses().then(res=>{
      this.statuses = res;
      this.statuses.forEach(element => {        
        if(element.status==this.currentStatus){
          this.currentStautDescription= element.description;
        }        
      });
      console.log(this.currentStautDescription)
    })
  }

  public getImage(image_pair,main_pair) {
    const image_array=[];
    if(Object.values(main_pair)[0] != null)
      image_array.push(main_pair["detailed"]["image_path"])

    if(Object.values(image_pair)[0] != null){     
      Object.values(image_pair).forEach(element => {
        image_array.push(element["detailed"]["image_path"])
      });
    }    
    // else{
    //   image_array.push("https://placeimg.com/150/300/any")
    // }
    // console.log(image_array);
    return image_array;
  };

  public handleCusNotesChange(data) {
    let clonedOrder = JSON.parse(JSON.stringify(this.order));
    this.order = clonedOrder;
    // this.store.dispatch(UpdateOrder({
    //   currentOrder: clonedOrder,
    // }));
  }
  createButton(){
    this.showBtn= true;
  }
  createShipment(){
    console.log(this.users_id)
    this.shippingService.getShippingMethodById(this.currentShipping_id).then(res=>{
      console.log(res['shipping'])
      this.currentShippingName = res['shipping'];
    })
    this.shipmentsService.createShipment({
      "carrier": "Fedex",
      "order_id": this.orderid,
      "products": this.GetProductList,
      "shipping": this.currentShippingName,
      "shipping_id": this.currentShipping_id,
      "user_id": this.users_id,
      "tracking_number": this.tracking_number
    }).then((resp: any) => {
      this.showBtn = false;
       console.log(resp['shipment_id'])
       this.newShippment_id=resp['shipment_id']
       this.goShipmentDetailPage(this.newShippment_id)
    })
  }


  checkShipment(){
    this.shipmentsService.getShipmentByOrderId(this.orderid).then(res=>{
      this.currentShipment = res[0]["shipping"];
      this.currentShipmentId =  res[0]["shipment_id"];
    })
  }
  
  getMessageById(){
    this.ordersService.getMessageById(this.orderid).then(res=>{
      this.discussions = [];
      for (const discussion of Object.values(res['discussions'])){
        console.log(discussion)
        this.discussions.push(discussion)
      }
    })
  }
  
    // Go to detail shipment page
    async goShipmentDetailPage(id) {
      this.checkShipment();
      const modal = await this.modalController.create({
        component: ShipmentDetailsComponent,
        componentProps: { id: id }
      });
      return await modal.present();
    }
    async goToMessageDetails(){
      const modal = await this.modalController.create({
        component: MessageDetailsComponent,
        componentProps:  { 
          order_id: this.orderid
        }
      });
      return await modal.present();
    }
    //refresh page
    refreshPage(){    
      window.location.reload();
    // this.getOrderById(this.orderid);
    // this.checkShipment();
    // this.getMessageById();
    }
    TotalCheckHidden(){
      if(this.total_hidden){
        this.total_hidden=false
      }else{
        this.total_hidden=true
      }
    }
    CheckHidden(){
      if(this.msg_hidden){
        this.msg_hidden=false
      }else{
        this.msg_hidden=true
      }
    }

}
