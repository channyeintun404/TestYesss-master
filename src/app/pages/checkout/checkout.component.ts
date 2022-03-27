/**
 * Checkout Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

 import { Component, OnInit,NgModule,ChangeDetectorRef, Input } from '@angular/core';
 import { ModalController } from '@ionic/angular';
 import { Router } from '@angular/router';
 import {ProductsService} from '../../services/products.service'; 
 import { Toast } from '@ionic-native/toast/ngx';;
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { ImagePicker ,ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import axios from 'axios';
import { image } from '@cloudinary/base/qualifiers/source';

import { Option } from 'src/app/models/option.model';
import { OptionsService } from 'src/app/services/options.service';
import { CookieService } from 'ngx-cookie-service';

const MEDIA_FOLDER_NAME = 'my_media';

@Injectable({
  providedIn : 'root'
})
 
 @Component({
   selector: 'app-checkout',
   templateUrl: './checkout.component.html',
   styleUrls: ['./checkout.component.scss'],
 })
 export class CheckoutComponent implements OnInit {

  selectedFile: any;
   steps: any = [];
   cards: any = [];
   checks: any = [];


   //image
   files = [];
   images:any[];

   //uploadimage
   mainImagesURl : any
   urls : any [];
   addImage : boolean;
   addImageRow:boolean;
   imagesUrlArray:any[]=[];
   imagesArrayforView: any[]=[];

   //option
   newProductId: any;
   options : Option[];
   addOptionSize: boolean;
   addOptionColor: boolean;
   isOption: boolean;
  //  optionSizeId: any;
   optionSizePostion :  string="";
   optionSizeName : string="";
   optionSizeStatus: string="";
   optionColorPostion :  string="";
   optionColorName : string="";
   optionColorStatus: string="";
   variantSizeIdArray: any[];
   variantSizeNameArray: any[];
   variantSizePositionArray: any[];
   variantSizeStatusArray: any [];
   variantColorIdArray: any[];
   variantColorNameArray: any[];
   variantColorPositionArray: any[];
   variantColorStatusArray: any [];
  //  variant : Variant[];
    optionSizeId : any;
   optionColorId : any;
   variants_size : any[];
   variants_color : any [];
  //  variants : any[];
   variantSizeArray : any[];
   variantColorArray : any[];

   products : Product[];
   categories: Category[];
   categoriesByLevel3:Category[];
   isHaveLevel2Child : boolean = false;
   Level2Child: any = [];
   isHaveLevel3Child : boolean = false;
   Level3Child: any = [];

   //get data from form
   productName: string=""; 
   productPrice: string="";
   productCode: string="";
   product_amount: string="1";
   productDescription: string="";
   category_ids: string;
   categoriesByLevel1_id : string="";
   categoriesByLevel2_id : string="";
   categoriesByLevel3_id : string="";
   status: string="";
   base_price: string="";
   list_price: string="";
   product_size : string="";
   product_color : string="";
  imagepairdetailed: any[]=[];
  refresh: boolean=false;
  companyId: any;
  error: string="";
  addOption: boolean;
  @Input() id: number;
  option_name: any;
  option_position: any;
  option_array: unknown[];
  variants_array: any[];
  optionIdArray: any[];
  show_option_name: any;
  variantName: string;
  variantPostion: string;
  variantStatus: string;
   
   constructor(public modalController: ModalController,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private productService : ProductsService,
    private optionsService : OptionsService,
    private http: HttpClient,
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private platfrom: Platform, 
    private cookieService: CookieService) { }
 
   ngOnInit() {
    this.companyId =  this.cookieService.get('companyId'); 
    this.getCategories();
    this.getLevel2Categories();

    this.imagePicker.hasReadPermission().then((val)=>{
      if(val == false){
        this.imagePicker.requestReadPermission();
      }
    },(err)=>{
      this.imagePicker.requestReadPermission();
    })

    // this.platfrom.ready().then(() => {
    //   let path = this.file.dataDirectory;
    //   this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
    //     () => {
    //       this.loadFiles();
    //     },
    //     err => {
    //       this.file.createDir(path, MEDIA_FOLDER_NAME, false);
    //     }
    //   );
    // });


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
       if(this.productName==""){
         this.error = "Please Enter Product Name!!"
       }else if(this.productPrice=="") {
         this.error = "Please Enter Product-Price!!"
       }else if(this.list_price==""){
        this.error = "Please Enter List-Price!!"
      }else{
        this.createProduct();
        this.steps[0].isSelected = false;
        this.steps[1].isSelected = true;
        this.checks[0].isSelected = true;
        this.checks[1].isSelected = true;
        this.refresh=true;
       }
       
     }
     // If current section is Billing then next section confirm will be visible 
     else if (this.steps[1].isSelected) {
       this.steps[0].isSelected = false;
       this.steps[1].isSelected = false;
       this.steps[2].isSelected = true;
       this.checks[0].isSelected = true;
       this.checks[1].isSelected = true;
       this.checks[2].isSelected = true;
       this.saveChangesProduct();
       this.refresh=false;
     }
   }

   //Click on categories
  level1clickOption(categoriesByLevel1_id){
  this.Level2Child.length = 0
  this.Level3Child.length = 0
   for(let value of this.categoriesByLevel3) {
        if(parseInt(categoriesByLevel1_id)==value.parent_id){
          this.Level2Child.push(value.id)
        }  
    }
    if(this.Level2Child.length==0){
      this.isHaveLevel2Child = false
      this.isHaveLevel3Child = false       
    }
    else
      this.isHaveLevel2Child = true
      // console.log("categord_id  "+this.category_ids)
}

level2ClickOption(categoriesByLevel2_id){
  this.Level3Child.length = 0
  for(let value of this.categoriesByLevel3) {
       if(parseInt(categoriesByLevel2_id)==value.parent_id){
         this.Level3Child.push(value.id)
       }  
   }
   if(this.Level3Child.length==0){
     this.isHaveLevel3Child = false  
     this.category_ids = categoriesByLevel2_id  
   }
   else
     this.isHaveLevel3Child = true
}

level3ClickOption(categoriesByLevel3_id){
  this.category_ids= categoriesByLevel3_id
}
 
   // Go to order page function
   gotoOrderPage() {
     this.dismiss();
     this.router.navigate(['/tabs/orders']);
   }


   //getproductOption
getProductOptions(){
  this.optionsService.getProductsOptions(this.newProductId).then((resp: any) => {
console.log(Object.values(resp))
    this.option_array = Object.values(resp)
    this.variants_array = [];
    for (const variants of Object.values(resp)) {
      // console.log(variants['option_id']) 
      // this.optionIdArray.push(variants['option_id'])
      this.variants_array.push(Object.values(variants['variants']))
    }
    console.log(this.optionIdArray)
  })  
}

  // Create Option
  createOption(){
    this.optionsService.createProductOptions({
      "product_id": this.newProductId,
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


  // Get list of categories
  getCategories() {    
    this.categoryService.getParentCategories().then((resp: any) => {
      console.log(resp);
      this.categories = resp;
    });
  }

  getLevel2Categories() {
    // this.categories = this.categoryService.categoryList();
    this.categoryService.getLevel2Categories().then((resp: any) => {
      console.log(resp);
      this.categoriesByLevel3 = resp;
    });
  }
 
   // Go to product page
   gotoProductsPage() {
     console.log(this.category_ids)
     this.dismiss();
     this.router.navigate(['/tabs/products']);
   }
 
   //Create Product
   createProduct(){
    //  console.log("image url is "+ this.mainImagesURl)
    this.productService.createProduct(
      {        
        "product": this.productName,        
        "product_code": this.productCode,
        "amount": this.product_amount,
        "category_ids":this.category_ids,
        "full_description": this.productDescription,
        "price":parseInt(this.productPrice),
        "list_price":parseInt(this.list_price),
        "status": this.status,
        "company_id": this.companyId,        
        "main_category": 275,
        "discountPrice": 50000,
        "details_layout": "default",
        "min_qty":0,
        "quantity": 1,
        "isWishlist": true
       }).then((resp: any) => {
       
        this.newProductId= resp
        // // if(this.productName==null){
        // //   this.error = "Please Enter Name of Product!!"
        // // }
        // this.createProductSizeOptions();
        // this.createProductColorOptions();
      })
      this.imagesArrayforView.push('1.jpg')
      this.isOption=true;
      this.getProductOptions(); 
      }   

      saveChangesProduct(){
        for(var i =0; i<this.imagesUrlArray.length; i++){
          if(i==0){
            this.mainImagesURl=this.imagesUrlArray[0];
          
          }
          const imageurlarray=[]
          imageurlarray.push({
            "image_path":this.imagesUrlArray[i],
            "http_image_path":this.imagesUrlArray[i],
            "https_image_path":this.imagesUrlArray[i]
          })

          console.log("image array",imageurlarray)

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
        this.productService.updateProduct(this.newProductId,
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
        

     

      



      //image
      loadFiles() {
        this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
          res => {
            this.files = res;
          },
          err => console.log('error loading files: ', err)
        );
      }
    
      async selectMedia() {
        const actionSheet = await this.actionSheetController.create({
          header: 'What would you like to add?',
          buttons: [
            {
              text: 'Capture Image',
              handler: () => {
                this.captureImage();
              }
            },            
            {
              text: 'Load multiple',
              handler: () => {
                this.pickImages();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        await actionSheet.present();
      }
     
      pickImages() {
        //this code are fine for ios but not android
        // this.imagePicker.getPictures({}).then(
        //   results => {
        //     for (var i = 0; i < results.length; i++) {
        //       this.copyFileToLocalDir(results[i]);
        //     }
        //   }
        // );

        let options: ImagePickerOptions={
          maximumImagesCount:10,
          outputType:1
          
        }
  
        this.imagePicker.getPictures(options).then((res)=>{
          for(var i =0; i<res.length;i++){
            this.copyFileToLocalDir(res[i]);
            let base64OfImage= "data:image/png;base64"+res[i]
            this.images.push(base64OfImage)
          }
        },(err)=>{
          alert(JSON.stringify(err))
        })
     
    
      }
     
      captureImage() {
        this.mediaCapture.captureImage().then(
          (data: MediaFile[]) => {
            if (data.length > 0) {
              this.copyFileToLocalDir(data[0].fullPath);
            }
          },
          (err: CaptureError) => console.error(err)
        );
      }     


      copyFileToLocalDir(fullPath) {
        let myPath = fullPath;
        // Make sure we copy from the right location
        if (fullPath.indexOf('file://') < 0) {
          myPath = 'file://' + fullPath;
        }
     
        const ext = myPath.split('.').pop();
        const d = Date.now();
        const newName = `${d}.${ext}`;
     
        const name = myPath.substr(myPath.lastIndexOf('/') + 1);
        const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
        const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
     
        this.file.copyFile(copyFrom, name, copyTo, newName).then(
          success => {
            this.loadFiles();
          },
          error => {
            console.log('error: ', error);
          }
        );
      }
     
      openFile(f: FileEntry) {
        if (f.name.indexOf('.wav') > -1) {
          // We need to remove file:/// from the path for the audio plugin to work
          const path =  f.nativeURL.replace(/^file:\/\//, '');
          const audioFile: MediaObject = this.media.create(path);
          audioFile.play();
        } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
          // E.g: Use the Streaming Media plugin to play a video
          this.streamingMedia.playVideo(f.nativeURL);
        } else if (f.name.indexOf('.jpg') > -1) {
          // E.g: Use the Photoviewer to present an Image
          this.photoViewer.show(f.nativeURL, 'MY awesome image');
        }
      }
     
      deleteFile(f: FileEntry) {
        const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
        this.file.removeFile(path, f.name).then(() => {
          this.loadFiles();
        }, err => console.log('error remove: ', err));
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


      openAddImageRow(){
        // this.addImageRow=true;
        this.imagesArrayforView.push('1.jpg');
        this.addImage=false
      }
    
      //open and closez
      openAddSizeRow(){        
        this.addOptionSize=true;         
      }
      closeAddSizeRowe(){
        this.addOptionSize=false;
      }
      openAddColorRow(){
        this.addOptionColor=true;
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
      //refresh of option
      resetPage(){
        this.getProductOptions();
      }


      cancelCreation(){
        if(confirm("Are you sure want to cancel!!")) {
          this.productService.deleteProduct(this.newProductId).then((res)=>{
            this.gotoProductsPage()
          })
        }   
      }

   // Back to previous screen
   dismiss() {
     this.modalController.dismiss({
       'dismissed': true
     })
   }
 
 }