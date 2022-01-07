import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
@Component({
  selector: 'app-logos',
  templateUrl: './logos.page.html',
  styleUrls: ['./logos.page.scss'],
})
export class LogosPage implements OnInit {
  companyId: string;
  company_info: any;
  company_logo1: any;
  alt_image1: any;
  company_logo2: any;
  alt_image2: any;
  selectedFile: any;
  selectImage: string="No File Choosen";
  imagesUrlArray: any[]=[];
  addImage : boolean;
  mainImagesURl : any;
  imagepairdetailed: any[]=[];
  imagesUrl: any;
  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location ,private vendorsServices: VendorsService, private cookieService: CookieService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId');
    this.getVendorsById(this.companyId);
  }

  getVendorsById(id){
     this.vendorsServices.getVendorById(id).then(res=>{
      console.log(res["vendors"]["0"]);
      this.company_info = res["vendors"]["0"];
      this.company_logo1 = this.company_info["logos"]["theme"]["image"]["image_path"];
      this.alt_image1 = this.company_info["logos"]["theme"]["image"]["alt"];
      this.company_logo2 = this.company_info["logos"]["mail"]["image"]["image_path"];
      this.alt_image2 = this.company_info["logos"]["mail"]["image"]["alt"];
    })
  }

  saveActivity(){
    this.vendorsServices.updateVerdor(this.companyId,{
      "logos": {
        "theme":{
          "image":{
            "alt":this.alt_image1,
          }
        },
        "mail":{
          "image":{
            "alt":this.alt_image2
          }
        }
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
      this.imagesUrl= res.data.url
    }).catch(function(err){
          console.error(err)
        });   
this.addImage=true         
}    

  back(): void {
    this.location.back()
  }
}
