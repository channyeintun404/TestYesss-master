/**
 * Checkout Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

 import { Component, OnInit,NgModule,ChangeDetectorRef } from '@angular/core';
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
   steps: any = [];
   cards: any = [];

   files = [];
   images:any[];

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
   productDescription: string="";
   category_ids: string;
   categoriesByLevel1_id : string="";
   categoriesByLevel2_id : string="";
   categoriesByLevel3_id : string="";
   status: string="";
   base_price: string="";
   list_price: string="";
   
   constructor(public modalController: ModalController,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
     private router: Router,
     private productService : ProductsService, private http: HttpClient,
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private platfrom: Platform) { }
 
   ngOnInit() {
    this.getCategories();
    this.getLevel2Categories();

    this.imagePicker.hasReadPermission().then((val)=>{
      if(val == false){
        this.imagePicker.requestReadPermission();
      }
    },(err)=>{
      this.imagePicker.requestReadPermission();
    })

    this.platfrom.ready().then(() => {
      let path = this.file.dataDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          this.loadFiles();
        },
        err => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
    });


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

    // Go to product page
//  async gotoProductsPage() { 
//   this.createProduct();
//   const modal = await this.modalController.create({
//     component: ProductsComponent,
    
//   });
//   this.dismiss();
//   return await modal.present();
// }


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
     this.createProduct();
     console.log(this.category_ids)
     this.dismiss();
     this.router.navigate(['/tabs/products']);
   }
 
   //Create Product
   createProduct(){
    this.productService.createProduct(
      {        
        "product": this.productName,
        "category_ids":this.category_ids,
        "full_description": this.productDescription,
        "price":parseInt(this.productPrice),
        "base_price":parseInt(this.base_price),
        "list_price":parseInt(this.list_price),
        "status": this.status,
        "company_id": 13,        
        "main_category": 275,
        "discountPrice": 50000,
        "details_layout": "default",
        "min_qty":1,//for no image upload
        "quantity": 1,
        "isWishlist": true
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


    
   // Back to previous screen
   dismiss() {
     this.modalController.dismiss({
       'dismissed': true
     })
   }
 
 }
 