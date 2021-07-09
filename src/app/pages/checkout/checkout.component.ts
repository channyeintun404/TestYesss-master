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
import { ProductsComponent } from '../products/products.component';

import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

const STORAGE_KEY = 'my_images';

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

   images = [];

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
     private productService : ProductsService,
     private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private platform: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath) { }
 
   ngOnInit() {
    this.getCategories();
    this.getLevel2Categories();

    this.platform.ready().then(() => {
      this.loadStoredImages();
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
      loadStoredImages() {
        this.storage.get(STORAGE_KEY).then(images => {
          if (images) {
            let arr = JSON.parse(images);
            this.images = [];
            for (let img of arr) {
              let filePath = this.file.dataDirectory + img;
              let resPath = this.pathForImage(filePath);
              this.images.push({ name: img, path: resPath, filePath: filePath });
            }
          }
        });
      }


      pathForImage(img) {
        if (img === null) {
          return '';
        } else {
          let converted = this.webview.convertFileSrc(img);
          return converted;
        }
      }
     
      async presentToast(text) {
        const toast = await this.toastController.create({
            message: text,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
      }


      async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image source",
            buttons: [{
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
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
     
    takePicture(sourceType: PictureSourceType) {
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
     
        this.camera.getPicture(options).then(imagePath => {
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        });
     
    }


    createFileName() {
      var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
      return newFileName;
  }
   
  copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast('Error while storing file.');
      });
  }
   
  updateStoredImages(name) {
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          if (!arr) {
              let newImages = [name];
              this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
          } else {
              arr.push(name);
              this.storage.set(STORAGE_KEY, JSON.stringify(arr));
          }
   
          let filePath = this.file.dataDirectory + name;
          let resPath = this.pathForImage(filePath);
   
          let newEntry = {
              name: name,
              path: resPath,
              filePath: filePath
          };
   
          this.images = [newEntry, ...this.images];
          this.ref.detectChanges(); // trigger change detection cycle
      });
  }


  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
 
    this.storage.get(STORAGE_KEY).then(images => {
        let arr = JSON.parse(images);
        let filtered = arr.filter(name => name != imgEntry.name);
        this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
 
        var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
 
        this.file.removeFile(correctPath, imgEntry.name).then(res => {
            this.presentToast('File removed.');
        });
    });
}


startUpload(imgEntry) {
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast('Error while reading file.');
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, file.name);
      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
  const loading = await this.loadingController.create({
      message: 'Uploading image...',
  });
  await loading.present();

  this.http.post("http://localhost:8888/upload.php", formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('File upload complete.')
          } else {
              this.presentToast('File upload failed.')
          }
      });
}

   // Back to previous screen
   dismiss() {
     this.modalController.dismiss({
       'dismissed': true
     })
   }
 
 }
 