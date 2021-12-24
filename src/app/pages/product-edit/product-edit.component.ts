import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { OptionsService } from 'src/app/services/options.service';
import { Option } from 'src/app/models/option.model';
import { Variant } from 'src/app/models/variants.model';
import { Router } from '@angular/router';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import axios from 'axios';
import { FormControl, FormGroup } from '@angular/forms';

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
   addOptionSize : boolean;
   addOptionColor : boolean
   addOption: boolean;
   isOption: boolean;
   optionId: any;
   optionSizePostion :  string="";
   optionSizeName : string="";
   optionSizeStatus: string="";
   optionColorPostion :  string="";
   optionColorName : string="";
   optionColorStatus: string="";
  //  variant : Variant[];
   variantSize : Variant[];
   variants : any[];
   optionSizeId: any;
   optionColorId: any;
   variants_size: any[];
   variants_color: any[];
   optionIdArray: any[]=[];

   imagesUrlArray: any[]=[];
   addImage : boolean;

   //uploadimage and update image
   mainImagesURl : any
   urls : any [];
   addImageRow:boolean;
   imagesArrayforView: any[]=[];   
  imagepairdetailed: any[]=[];
  selectedFile: any;
  variantSizeIdArray: any[];
  variantSizeNameArray: any[];
  variantSizePositionArray: any[];
  variantSizeStatusArray: any[];
  variantColorIdArray: any[];
  variantColorNameArray: any[];
  variantColorPositionArray: any[];
  variantColorStatusArray: any[];
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

  // editorForm: FormGroup
  constructor(public modalController: ModalController,    
    private optionsService : OptionsService,
    private productService : ProductsService,
    private productsService: ProductsService
    , private router: Router) { }
    

  ngOnInit() {

    this.getProductById();
    this.getProductOptions();
    // this.editorForm = new FormGroup({
    //   'editor': new FormControl(null)
    // })

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
    this.name = res['product']
    this.price = res['price']
    this.price = parseInt(this.price.toFixed())
    this.product_code = res['product_code']    
    this.product_amount = res['amount']
    this.list_price = res['list_price']
    this.list_price = parseInt(this.list_price.toFixed())
    this.full_description = res['full_description']
    this.status = res['status']
    for (const image of Object.values(res['image_pairs'])){
      // console.log(image['detailed']['http_image_path'])
      this.imagesUrlArray.push(image['detailed']['http_image_path'])
    }
    console.log(this.imagesUrlArray)
  })
}

//getproductOption
getProductOptions(){
  this.optionsService.getProductsOptions(this.id).then((resp: any) => {
console.log(Object.values(resp))
    this.option_array = Object.values(resp)
    this.variants_array = [];
    for (const variants of Object.values(resp)) {
      // console.log(variants['option_id']) 
      this.optionIdArray.push(variants['option_id'])
      this.variants_array.push(Object.values(variants['variants']))
    }
    console.log(this.optionIdArray)
    this.optionSizeId = this.optionIdArray[0]
    this.optionColorId = this.optionIdArray[1]
      this.getOptionsSizeById(this.optionSizeId);
      this.getOptionsColorById(this.optionColorId);
  //  this.getProductColorOptions();
  })
  
}
// getVariant(variants){
//   console.log(Object.values(variants))
//   const variant_array = [];
//   this.variants_array = [];
//   variant_array.push(Object.values(variants));
//   for (const variant of Object.values(variants)) {
//     // console.log(variant['option_name']) 
//     // variant_array.push(variant['option_name'])
//     variant_array.push({
//       "id":variant["option_id"],
//       "variant_name":variant["variant_name"],
//       "position":variant["position"],
//       "status": variant["status"]
//     })
//     // this.variants_array.push(variant_array)
//   }
//   // return variant_array;
//   console.log(variant_array)
// }
getOptionsSizeById(option_id){
  this.optionsService.getOptionsById(option_id).then((res: any) => {
    this.options=[];
    
    this.variants_size=[]
    this.variantSizeIdArray=[]
    this.variantSizeNameArray=[]
    this.variantSizePositionArray=[]
    this.variantSizeStatusArray=[]
    for (const variant of Object.values(res['variants'])) {
        // imagesArr.push(img['detailed']['image_path']);
        // console.log("variant are "+variant['variant_name'])

        this.variantSizeNameArray.push(variant['variant_name'])
        this.variantSizePositionArray.push(variant['position'])
        this.variantSizeStatusArray.push(variant['status'])
        this.variantSizeIdArray.push(variant['variant_id'])
        console.log("variant are "+this.variantSizeNameArray)
      }  

    // console.log("this getopiton res"+JSON.stringify(resp));
    this.options.push({
        option_id : parseInt( res['option_id']),
        option_name:  res['option_name'],
        product_id:parseInt( res['product_id']),
        variant_id:this.variantSizeIdArray,
        position: this.variantSizePositionArray,
        status:this.variantSizeStatusArray,
        variant_name:this.variantSizeNameArray
    })

    for(var i =0; i<this.variantSizeNameArray.length; i++){
      this.variants_size.push({
        "id":this.variantSizeIdArray[i],
        "variant_name":this.variantSizeNameArray[i],
        "position":this.variantSizePositionArray[i],
        "status": this.variantSizeStatusArray[i]
      })  
    }  
    console.log(this.variants_size)
    // console.log("this get opiton is "+JSON.stringify(this.options))
    // console.log("variants name are "+JSON.stringify(this.variantnameArray))
  })
}  

getOptionsColorById(option_id){
  this.optionsService.getOptionsById(option_id).then((res: any) => {
    // this.options=[];
    
    this.variants_color=[]
    this.variantColorIdArray=[]
    this.variantColorNameArray=[]
    this.variantColorPositionArray=[]
    this.variantColorStatusArray=[]
    for (const variant of Object.values(res['variants'])) {
        // imagesArr.push(img['detailed']['image_path']);
        // console.log("variant are "+variant['variant_name'])

        this.variantColorNameArray.push(variant['variant_name'])
        this.variantColorPositionArray.push(variant['position'])
        this.variantColorStatusArray.push(variant['status'])
        this.variantColorIdArray.push(variant['variant_id'])
        console.log("variant are "+this.variantColorNameArray)
      }  

    for(var i =0; i<this.variantColorNameArray.length; i++){
      this.variants_color.push({
        "id":this.variantColorIdArray[i],
        "variant_name":this.variantColorNameArray[i],
        "position":this.variantColorPositionArray[i],
        "status": this.variantColorStatusArray[i]
      })  
    }  
    console.log(this.variants_color)
    // console.log("this get opiton is "+JSON.stringify(this.options))
    // console.log("variants name are "+JSON.stringify(this.variantnameArray))
  })
}  

onFileSelected(event){

  this.selectedFile = <File> event.target.files[0];
  
  console.log(this.selectedFile)
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
    }).catch(function(err){
          console.error(err)
        });   
this.addImage=true         
}    

 //open and closez
 openAddSizeRow(){ 
  this.addOptionSize  =true;     
  // this.addOption=true;         
}
openAddColorRow(){ 
  this.addOptionColor  =true;     
  // this.addOption=true;         
}
closeAddSizeRow(){
  this.addOptionSize=false;
}
closeAddColorRow(){
  this.addOptionColor=false;
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
  "full_description":this.full_description
 })
 
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
      "variants": { }
    }).then((resp: any) => {       
   console.log("complete add option")
   this.addOption=false;
    this.option_name="";
    this.option_position="";
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
      console.log(convertArrayToObject( variantsArray,'id'))
  
      // console.log( Object.assign({},Object.assign({},this.variantnameArray)))
      this.optionsService.updateOptions(option_id,{
        "variants": variantsArray
      })
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
}