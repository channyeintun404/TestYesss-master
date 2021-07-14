import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {


  steps: any = [];
  cards: any = [];

  @Input() id: number;
  name: String;
  description: String;
  product_code:String;
  price: number;
  list_price : number;
  base_price : number;
  discountPrice: number;
  status : String;
  images: Array<String>;
  size: Array<String>;
  color: Array<String>;
  isWishlist: boolean;

  products: Product;


  constructor(public modalController: ModalController,
    private productsService: ProductsService) { }
    

  ngOnInit() {

    this.getProductById();

  // Checkout steps   
  this.steps = [
    {
      step: "Detail",
      isSelected: true
    },
    {
      step: "Images",
      isSelected: false
    },
    {
      step: "Confirm",
      isSelected: false
    }
  ]

  // Payment cards images
  this.cards = ["assets/images/cards/visa.png",
    "assets/images/cards/mastercard.png",
    "assets/images/cards/paypal.png"]      
}

 // Go to xext section function
 next() {
  // If current section is billing then next payment section will be visible
  if (this.steps[0].isSelected) {
    this.steps[0].isSelected = false;
    this.steps[1].isSelected = true;
  }
  // If current section is Billing then next section confirm will be visible 
  else if (this.steps[1].isSelected) {
    this.steps[0].isSelected = false;
    this.steps[1].isSelected = false;
    this.steps[2].isSelected = true;
  }
}

getProductById(){
  console.log("id is ="+this.id)

  this.productsService.getProductById(this.id).then( res=>{
    console.log(res);
    this.name = res['product']
    this.price = res['price']
    this.product_code = res['product_code']
    this.list_price = res['list_price']
    this.base_price = res['base_price']
    this.status = res['status']

  })
}

saveChanges(){
this.productsService.updateProduct(this.id, {        
  "product": this.name,
  "price":this.price,
  "product_code":this.product_code,
  "list_price":this.list_price,
  "base_price": this.base_price,
  "status" : this.status
 })
 this.goToProductEditPage
 this.dismiss();
}

async goToProductEditPage(){
  this.addproduct()
  const modal = await this.modalController.create({
    component: ProductEditComponent,
    componentProps: this.products
  });
  return await modal.present();
}

addproduct() {
  this.products = {
    id: this.id,
    name: this.name,
    description: this.description,
    price: this.price,
    discountPrice: this.discountPrice,
    images: this.images,
    size: this.size,
    color: this.color,
    quantity: 1,
    isWishlist: this.isWishlist
  }
}
dismiss() {
  this.modalController.dismiss({
    'dismissed': true
  })
}


}
