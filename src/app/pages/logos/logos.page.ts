import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
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
            "alt":this.alt_image1
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

  back(): void {
    this.location.back()
  }
}
