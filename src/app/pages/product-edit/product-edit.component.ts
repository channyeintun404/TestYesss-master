import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { OptionsService } from 'src/app/services/options.service';
import { Option } from 'src/app/models/option.model';
import { Variant } from 'src/app/models/variants.model';
import { Router } from '@angular/router';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import axios from 'axios';
import { FormControl, FormGroup } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {


  steps: any = [];
  cards: any = [];
  checks: any= [];
  backs: any= [];

  @Input() id: number;
  name: String;
  description: String;
  product_code:String;
  product_amount: String;
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
   variants : any[];
   optionIdArray: any[]=[];
   featureIdArray: any[]=[];

   imagesUrlArray: any[]=[];
   addImage : boolean;

   //uploadimage and update image
   mainImagesURl : any
   urls : any [];
   addImageRow:boolean;
   imagesArrayforView: any[]=[];   
  imagepairdetailed: any[]=[];
  selectedFile: any;
  full_description: any;
  option_position: any;
  option_name: any;
  option_array: unknown[];
  addVariant: boolean;
  variantName: any;
  variantPostion: any;
  variantStatus: any;
  show_option_name= "";
  variant_id: any;
  variants_array: any[];
  brand_array: any[];
  features_array: any[];
  select_brand_id: any
  selectImage: string="Please Select File";
  variant: any;
  brand: any;

  // editorForm: FormGroup
  constructor(public modalController: ModalController,    
    private optionsService : OptionsService,
    private productService : ProductsService,
    private productsService: ProductsService
    , private router: Router, private featuresService: FeaturesService) { }
    

   ngOnInit() {

    this.getFeatures();
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

this.checks = [

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

this.backs = [

  {
    isSelected: true
  },
  {
    isSelected: false
  },
  {
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
    this.checks[0].isSelected = true;
    this.checks[1].isSelected = true;
    this.backs[0].isSelected = false;    
    this.backs[1].isSelected = true;
    this.backs[2].isSelected = false;
    this.saveChanges();
  }
  // If current section is Billing then next section confirm will be visible 
  else if (this.steps[1].isSelected) {
     this.steps[0].isSelected = false;
    this.steps[1].isSelected = false;
     this.steps[2].isSelected = true;
     this.checks[0].isSelected = true;
    this.checks[1].isSelected = true;
    this.checks[2].isSelected = true;
    this.backs[0].isSelected = false;    
    this.backs[1].isSelected = false;
    this.backs[2].isSelected = true;
    this.saveChangesProductImage();
  }
}



getProductById(){
  console.log("id is ="+this.id)

  this.productsService.getProductById(this.id).then( res=>{
    console.log(res);
    this.product_code = res['product_code']
    this.list_price = res['list_price']    
    this.product_amount = res['amount']
    this.list_price = res['list_price']
    this.select_brand_id =  res['product_features']['18']['variant_id']
    this.name = res['product']
    this.price = res['price']
    this.price = parseInt(this.price.toFixed())
   
    // this.list_price = parseInt(this.list_price.toFixed())
    this.full_description = res['full_description']
    this.status = res['status']
    for (const image of Object.values(res['image_pairs'])){
      // console.log(image['detailed']['http_image_path'])
      this.imagesUrlArray.push(image['detailed']['http_image_path'])
    }
    console.log(this.imagesUrlArray)
  })
 
}

//getproductfeature
getFeatures(){
  this.featuresService.getAllFeatures().then((res: any) => {
console.log(res)
    // this.option_array = Object.values(resp)
    this.brand_array = [];
    for (const feature of Object.values(res['variants'])) {
      this.brand_array.push(feature)
    }
    console.log(this.brand_array)
  })
  
}
//getproductOption
getProductOptions(){
  this.optionsService.getProductsOptions(this.id).then((resp: any) => {
console.log(Object.values(resp))
    this.option_array = Object.values(resp)
    this.variants_array = [];
    for (const variants of Object.values(resp)) {
      console.log(variants['option_id']) 
      this.optionIdArray.push(variants['option_id'])
      this.variants_array.push(Object.values(variants['variants']))
    }
  })
  
}



onFileSelected(event){

  this.selectedFile = <File> event.target.files[0];  
  console.log(this.selectedFile)
  this.selectImage = this.selectedFile.name
}

//upload images
onUpload(){
  const fd = new FormData();
  fd.append('file',this.selectedFile)
  fd.append("upload_preset", "my-preset"); 

  axios({
    url:'https://api.cloudinary.com/v1_1/u1textile/image/upload',
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },data:fd
  }).then((res: any) => {
      console.log(res)
      // this.mainImagesURl= res.data.url
      this.imagesUrlArray.push(res.data.url) 
      this.selectedFile=null;
      this.selectImage="Please Select File!!";     
    }).catch(function(err){
          console.error(err)
        });   
this.addImage=true         
}    

// create option
showAddOption(){
  this.addOption=true;
}
closeAddOption(){
  this.addOption=false;
  this.option_name="";
  this.option_position="";
}
openAddVariantRow(option_name){
  this.show_option_name = option_name
  this.variantName="";
  this.variantPostion="";
  this.variantStatus="";
  // this.addVariant=true;
}
closeVariant(){
  this.show_option_name = "";
  this.variantName = "";
  this.variantPostion = "";
  this.variantStatus ="";
}
saveChanges(){
this.productsService.updateProduct(this.id, {        
  "product": this.name,
  "price":this.price,
  "product_code":this.product_code,  
  "amount": this.product_amount,
  "list_price":this.list_price,
  "status" : this.status,
  "full_description":this.full_description,
  "product_features": {
    18:{
      "feature_id": "18",
      "value": "",
      "value_int": null,
      "variant_id": this.select_brand_id,
      "feature_type": "E",
      "description": "Brand",
      "prefix": "",
      "suffix": "",
      "variant": "",
      "parent_id": "0",
      "display_on_header": "Y",
      "display_on_catalog": "N",
      "display_on_product": "N",
      "features_hash": "10-92",
      "variants": ""
  },
  }
 })
console.log(this.select_brand_id)
 
}

// Go to product details page
async goToProductDetails() {
  // this.dismiss();  
  this.router.navigate([`/tabs/products`]);
  location.reload();
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
  for(var i =0; i<this.imagesUrlArray.length; i++){
    if(i==this.imagesUrlArray.length-1){
      this.mainImagesURl=this.imagesUrlArray[this.imagesUrlArray.length-1];
    
    }
    this.imagepairdetailed.push({
      "id":i,
      "detailed":{
        "image_path":this.imagesUrlArray[i],
        "http_image_path":this.imagesUrlArray[i],
        "https_image_path":this.imagesUrlArray[i]            
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

  createOption(){
    this.optionsService.createProductOptions({
      "product_id": this.id,
      "option_name": this.option_name,
      "position": this.option_position,
      "option_type": "S",
      "company_id":"16",
      "variants": { }
    }).then((resp: any) => {       
   console.log("complete add option")
   this.addOption=false;
    this.option_name="";
    this.option_position="";
    this.getProductOptions();
    })
   }

   deleteOption(option_id){
     this.optionsService.deleteOption(option_id).then((resp:any)=>{
       this.getProductOptions();
     })
   }

   
  updateVariant(option_name,option_id,variant_id,name,position,stauts,isdelete){
    console.log(option_name)    
    const variantsArray =[];
    this.optionsService.getOptionsById(option_id).then((res: any) => {
      console.log(res)
      for (const variant of Object.values(res['variants'])){
        if(variant_id==variant["variant_id"]){
          if(isdelete==1){
            // this.getProductOptions();
          }else{
            variantsArray.push({
              "id":variant_id,
              "variant_name":name,
              "position":position,
              "status":stauts
            })
          }
         
        }else{
          variantsArray.push({
            "id":variant["variant_id"],
            "variant_name":variant["variant_name"],
            "position":variant["position"],
            "status": variant["status"]
          })
        }       
      }
      if(variant_id==""){
        variantsArray.push({
          "id":"166",
          "variant_name":this.variantName,
          "position":this.variantPostion,
          "status":this.variantStatus
        })
      }
      const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
      if(variantsArray.length==0){
        this.optionsService.updateOptions(option_id,{
          "variants": {
              "36": {}}
        })
        this.getProductOptions();
      }else{
        console.log(convertArrayToObject( variantsArray,'id'))
        this.optionsService.updateOptions(option_id,{
          "variants": variantsArray
        })
      }
      this.getProductOptions();
    })
    // this.variantName="";
    // this.variantPostion="";
    // this.variantStatus="";
    this.show_option_name="";   
  }

deleteimage(image){
  console.log(image)
  for(var i=0;i<this.imagesUrlArray.length;i++){
    if(this.imagesUrlArray[i]==image)
    // delete this.imagesUrlArray[i]    
    this.imagesUrlArray.splice(i,1)
  }
// console.log(this.imagesUrlArray.length)
}
addingImage(){
this.addImage=true;
}

dismiss() {
  this.modalController.dismiss({
    'dismissed': true
  })
}
backfirstpage(){
  this.backs[0].isSelected = true;
  this.backs[1].isSelected = false;
  this.backs[2].isSelected = false;
  this.steps[0].isSelected = true;
  this.steps[1].isSelected = false;  
  this.steps[2].isSelected = false;
  this.checks[0].isSelected = true;
  this.checks[1].isSelected = false;
  this.checks[2].isSelected = false;
}
backsecondpage(){
  this.backs[0].isSelected = false;
  this.backs[1].isSelected = true;
  this.backs[2].isSelected = false;
  this.steps[0].isSelected = false;
  this.steps[1].isSelected = true;  
  this.steps[2].isSelected = false;
  this.checks[0].isSelected = true;
  this.checks[1].isSelected = true;
  this.checks[2].isSelected = false;
}

// Go to product details page
async goToAddBrand(product) {
  const modal = await this.modalController.create({
    component: AddBrandComponent
  });
  return await modal.present();
}
}