import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  companyId: string;
  company_info: any;
  company_description: any;
  setting: string;

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location, private vendorsServices: VendorsService, private cookieService: CookieService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId');    
    this.setting = this.cookieService.get('setting');
    this.getVendorsById(this.companyId);
  }
  getVendorsById(id){
    this.vendorsServices.getVendorById(id).then(res=>{
      this.company_info = res["vendors"]["0"];
      this.company_description = this.company_info.company_description;
    })
  }

  saveActivity(){
    this.vendorsServices.updateVerdor(this.companyId,{
      "company_description": this.company_description,
     
    })
  }
  back(): void {
    this.location.back()
  }
}
