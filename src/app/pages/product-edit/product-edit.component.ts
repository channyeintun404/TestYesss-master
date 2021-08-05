import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { OptionsService } from 'src/app/services/options.service';
import { Option } from 'src/app/models/option.model';
import { Variant } from 'src/app/models/variants.model';

import { ProductDetailsComponent } from '../product-details/product-details.component';


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

   //option
   options : Option[];
   addOption: boolean;
   isOption: boolean;
   optionId: any;
   optionPostion :  string="";
   optionName : string="";
   optionStatus: string="";
   variantIdArray: any[];
   variantnameArray: any[];
   variantPositionArray: any[];
   variantStatusArray: any [];
   variant : Variant[];

   imagearray: any[]=[];
   addImage : boolean;

   //uploadimage and update image
   mainImagesURl : any
   urls : any [];
   addImageRow:boolean;
   imagesArrayforView: any[]=[];   
  imagepairdetailed: any[]=[];


  constructor(public modalController: ModalController,    
    private optionsService : OptionsService,
    private productService : ProductsService,
    private productsService: ProductsService) { }
    

  ngOnInit() {

    this.getProductById();
    this.getProductOptions();

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
    this.saveChanges();
  }
  // If current section is Billing then next section confirm will be visible 
  else if (this.steps[1].isSelected) {
    this.steps[0].isSelected = false;
    this.steps[1].isSelected = false;
    this.steps[2].isSelected = true;
    // this.saveChangesProductImage();
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
    for (const image of Object.values(res['image_pairs'])){
      // console.log(image['detailed']['http_image_path'])
      this.imagearray.push(image['detailed']['http_image_path'])
    }
    console.log(this.imagearray)
  })
}

//getproductOption
getProductOptions(){
    
  this.optionsService.getProductsOptions(this.id).then((resp: any) => {
console.log(Object.values(resp))
    for (const variants of Object.values(resp)) {
      console.log(variants['option_id']) 
      this.optionId=variants['option_id']
      this.getOptionsById(variants['option_id']);     
    }
   
  })
  
}

getOptionsById(option_id){
  this.optionsService.getOptionsById(option_id).then((res: any) => {
    this.options=[];
    
    this.variant=[]
    this.variantIdArray=[]
    this.variantnameArray=[]
    this.variantPositionArray=[]
    this.variantStatusArray=[]
    for (const variant of Object.values(res['variants'])) {
        // imagesArr.push(img['detailed']['image_path']);
        // console.log("variant are "+variant['variant_name'])

        this.variantnameArray.push(variant['variant_name'])
        this.variantPositionArray.push(variant['position'])
        this.variantStatusArray.push(variant['status'])
        this.variantIdArray.push(variant['variant_id'])
        console.log("variant are "+this.variantnameArray)
      }  

    // console.log("this getopiton res"+JSON.stringify(resp));
    this.options.push({
        option_id : parseInt( res['option_id']),
        option_name:  res['option_name'],
        product_id:parseInt( res['product_id']),
        variant_id:this.variantIdArray,
        position: this.variantPositionArray,
        status:this.variantStatusArray,
        variant_name:this.variantnameArray
    })

    for(var i =0; i<this.variantnameArray.length; i++){
      this.variant.push({
        "id":this.variantIdArray[i],
        "variant_name":this.variantnameArray[i],
        "position":this.variantPositionArray[i],
        "status": this.variantStatusArray[i]
      })  
    }  
    // console.log("this get opiton is "+JSON.stringify(this.options))
    // console.log("variants name are "+JSON.stringify(this.variantnameArray))
  })
}  

      //add and update option
      createOption(){
        if(this.optionName!=""){
        this.variantnameArray.push(this.optionName)
        this.variantPositionArray.push(this.optionPostion)
        this.variantStatusArray.push(this.optionStatus)
      }
        // console.log(this.variantnameArray)
        this.variant=[];
        for(var i =0; i<this.variantnameArray.length; i++){
          this.variant.push({
            "id":i,
            "variant_name":this.variantnameArray[i],
            "position":this.variantPositionArray[i],
            "status": this.variantStatusArray[i]
          })
        }
        console.log("******"+JSON.stringify(this.variant))
        const convertArrayToObject = (array, key) => {
          const initialValue = {};
          return array.reduce((obj, item) => {
            return {
              ...obj,
              [item[key]]: item,
            };
          }, initialValue);
        };
        console.log(convertArrayToObject( this.variant,'id'))

        // console.log( Object.assign({},Object.assign({},this.variantnameArray)))
        this.optionsService.updateOptions(this.optionId,{
          "variants": this.variant
        })
        this.addOption=false
        this.optionName=""
        this.optionPostion=""
        this.optionStatus=""
      }



//update option
updateOption(){
  if(this.optionName!=""){
  this.variantnameArray.push(this.optionName)
  this.variantPositionArray.push(this.optionPostion)
  this.variantStatusArray.push(this.optionStatus)
}
  console.log(this.variant)
  // this.variant=[];
  const namearray=[];
  const positionarray=[];
  const statusarray=[];
  for(var i =0; i<this.variant.length; i++){
    namearray.push(this.variant[i].variant_name);
    positionarray.push(this.variant[i].position);
    statusarray.push(this.variant[i].status);
  }
  console.log(namearray)

  const variantsarray=[]
  for(var i =0; i<this.variant.length; i++){
    variantsarray.push({
      "id":i,
      "variant_name":namearray[i],
      "position":positionarray[i],
      "status": statusarray[i]
    })
  }
  console.log(variantsarray)
  // console.log("******"+JSON.stringify(this.variant))
  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  console.log(convertArrayToObject( variantsarray,'id'))

  // console.log( Object.assign({},Object.assign({},this.variantnameArray)))
  this.optionsService.updateOptions(this.optionId,{
    "variants": variantsarray
  })

}

 //open and closez
 openAddRow(){        
  this.addOption=true;         
}
closeAddRow(){
  this.addOption=false;
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
 
}

// Go to product details page
async goToProductDetails() {
  this.addproduct();
  const modal = await this.modalController.create({
    component: ProductDetailsComponent,
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

saveChangesProductImage(){
  for(var i =0; i<this.imagearray.length; i++){
    if(i==0){
      this.mainImagesURl=this.imagearray[0];
    
    }
    const imageurlarray=[]
    imageurlarray.push({
      "image_path":this.imagearray[i],
      "http_image_path":this.imagearray[i],
      "https_image_path":this.imagearray[i]
    })

    // const result = imageurlarray.reduce((obj, cur) => ({...obj, [cur.sid]: cur}), {})
    // console.log("result"+JSON.stringify(result))
    this.imagepairdetailed.push({
      "id":i,
      "detailed":{
        "image_path":this.imagearray[i],
        "http_image_path":this.imagearray[i],
        "https_image_path":this.imagearray[i]            
      }           
      
    })
  }
  console.log("******"+JSON.stringify(this.imagepairdetailed))
  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  console.log(convertArrayToObject( this.imagepairdetailed,'id'))
  console.log("obj of image_pair "+JSON.stringify(this.imagepairdetailed))
  // console.log("update image url"+this.mainImagesURl)
  this.productService.updateProduct(this.id,
  {        

    "main_pair": {
      "image_id": "0",
      "position": "0",
      "detailed": {
          "object_type": "product",
          "type": "M",
          "image_path": this.mainImagesURl,
          "alt": "",
          "image_x": "711",
          "image_y": "950",
          "http_image_path": this.mainImagesURl,
          "https_image_path": this.mainImagesURl
      }
    },
    "image_pairs":this.imagepairdetailed
   })       

  }

deleteimage(image){
  console.log(image)
  for(var i=0;i<this.imagearray.length;i++){
    if(this.imagearray[i]==image)
    // delete this.imagearray[i]    
    this.imagearray.splice(i,1)
  }
// console.log(this.imagearray.length)
}
addingImage(){
this.addImage=true;
}

dismiss() {
  this.modalController.dismiss({
    'dismissed': true
  })
}

}
