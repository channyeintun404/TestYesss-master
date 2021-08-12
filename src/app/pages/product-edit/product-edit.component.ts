import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { OptionsService } from 'src/app/services/options.service';
import { Option } from 'src/app/models/option.model';
import { Variant } from 'src/app/models/variants.model';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import axios from 'axios';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {


  steps: any = [];
  cards: any = [];
  checks: any= [];

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


  constructor(public modalController: ModalController,    
    private optionsService : OptionsService,
    private productService : ProductsService,
    private productsService: ProductsService) { }
    

  ngOnInit() {

    this.getProductById();
    this.getProductOptions();
    // this.getProductColorOptions();

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
    this.saveChangesProductImage();
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
      this.imagesUrlArray.push(image['detailed']['http_image_path'])
    }
    console.log(this.imagesUrlArray)
  })
}

//getproductOption
getProductOptions(){
  this.optionsService.getProductsOptions(this.id).then((resp: any) => {
console.log(Object.values(resp))
    for (const variants of Object.values(resp)) {
      // console.log(variants['option_id']) 
      this.optionIdArray.push(variants['option_id'])
           
    }
    console.log(this.optionIdArray)
    this.optionSizeId = this.optionIdArray[0]
    this.optionColorId = this.optionIdArray[1]
      this.getOptionsSizeById(this.optionSizeId);
      this.getOptionsColorById(this.optionColorId);
  //  this.getProductColorOptions();
  })
  
}
// getProductColorOptions(){
    
//   this.optionsService.getProductsOptions(this.id).then((resp: any) => {
// console.log(Object.values(resp))
//     for (const variant of Object.values(resp)) {
//       console.log(variant['option_id']) 
//       this.optionColorId=variant['option_id']
//       this.getOptionsColorById(this.optionColorId);     
//     }
   
//   })
  
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

    // console.log("this getopiton res"+JSON.stringify(resp));
    // this.options.push({
    //     option_id : parseInt( res['option_id']),
    //     option_name:  res['option_name'],
    //     product_id:parseInt( res['product_id']),
    //     variant_id:this.variantIdArray,
    //     position: this.variantPositionArray,
    //     status:this.variantStatusArray,
    //     variant_name:this.variantnameArray
    // })

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

      //add and update option
       createSizeOption(){
        if(this.optionSizeName!=""){
        this.variantSizeNameArray.push(this.optionSizeName)
        this.variantSizePositionArray.push(this.optionSizePostion)
        this.variantSizeStatusArray.push(this.optionSizeStatus)
      }

        // console.log(this.variantnameArray)
        // this.variantSize=[];
        const variantSizeArray =[];
        for(var i =0; i<this.variantSizeNameArray.length; i++){
          variantSizeArray.push({
            "id":i,
            "variant_name":this.variantSizeNameArray[i],
            "position":this.variantSizePositionArray[i],
            "status": this.variantSizeStatusArray[i]
          })
        }
        console.log("*****",variantSizeArray)
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
        console.log(convertArrayToObject( variantSizeArray,'id'))

        // console.log( Object.assign({},Object.assign({},this.variantnameArray)))
        this.optionsService.updateOptions(this.optionSizeId,{
          "variants": variantSizeArray
        })
        this.addOptionSize=false
        this.optionSizeName=""
        this.optionSizePostion=""
        this.optionSizeStatus=""
        this.getProductOptions();
      }

      createColorOption(){
        if(this.optionColorName!=""){
        this.variantColorNameArray.push(this.optionColorName)
        this.variantColorPositionArray.push(this.optionColorPostion)
        this.variantColorStatusArray.push(this.optionColorStatus)
      }

        // console.log(this.variantnameArray)
        // this.variantSize=[];
        const variantColorArray =[];
        for(var i =0; i<this.variantColorNameArray.length; i++){
          variantColorArray.push({
            "id":i,
            "variant_name":this.variantColorNameArray[i],
            "position":this.variantColorPositionArray[i],
            "status": this.variantColorStatusArray[i]
          })
        }
        console.log("*****",variantColorArray)
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
        console.log(convertArrayToObject( variantColorArray,'id'))

        // console.log( Object.assign({},Object.assign({},this.variantnameArray)))
        this.optionsService.updateOptions(this.optionColorId,{
          "variants": variantColorArray
        })
        this.addOptionColor=false
        this.optionColorName=""
        this.optionColorPostion=""
        this.optionColorStatus=""
        this.getProductOptions();
      }


//update option
updateOptionSize(position){
// delete function
for(var i=0;i<this.variants_size.length;i++){
  if(this.variants_size[i].position==position)   
  this.variants_size.splice(i,1)
}

  console.log(this.variants_size)
  // this.variant=[];
  const namearray=[];
  const positionarray=[];
  const statusarray=[];
  for(var i =0; i<this.variants_size.length; i++){
    namearray.push(this.variants_size[i].variant_name);
    positionarray.push(this.variants_size[i].position);
    statusarray.push(this.variants_size[i].status);
  }
  console.log(namearray)

  const variantsarray=[]
  for(var i =0; i<this.variants_size.length; i++){
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
  
  
  this.optionsService.updateOptions(this.optionSizeId,{
    "variants": variantsarray
  })

}

updateOptionColor(position){
  // delete function
  for(var i=0;i<this.variants_color.length;i++){
    if(this.variants_color[i].position==position)   
    this.variants_color.splice(i,1)
  }
  
    console.log(this.variants_color)
    // this.variant=[];
    const namearray=[];
    const positionarray=[];
    const statusarray=[];
    for(var i =0; i<this.variants_color.length; i++){
      namearray.push(this.variants_color[i].variant_name);
      positionarray.push(this.variants_color[i].position);
      statusarray.push(this.variants_color[i].status);
    }
    console.log(namearray)
  
    const variantsarray=[]
    for(var i =0; i<this.variants_color.length; i++){
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
    
    
    this.optionsService.updateOptions(this.optionColorId,{
      "variants": variantsarray
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
  for(var i =0; i<this.imagesUrlArray.length; i++){
    if(i==this.imagesUrlArray.length-1){
      this.mainImagesURl=this.imagesUrlArray[this.imagesUrlArray.length-1];
    
    }
    // const imageurlarray=[]
    // imageurlarray.push({
    //   "image_path":this.imagesUrlArray[i],
    //   "http_image_path":this.imagesUrlArray[i],
    //   "https_image_path":this.imagesUrlArray[i]
    // })

    // const result = imageurlarray.reduce((obj, cur) => ({...obj, [cur.sid]: cur}), {})
    // console.log("result"+JSON.stringify(result))
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

}
