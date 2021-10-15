import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
// import { Vendor } from 'src/app/models/vendor.model';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  companyName: any;
  company_info: any;
  Status: any;
  Language: any;
  Email: any;
  companyId: string;

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location, private vendorsServices: VendorsService, private cookieService: CookieService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId');
    this.getVendorsById(this.companyId);
  }
getVendorsById(id){
  this.vendorsServices.getVendorById(id).then(res=>{
    console.log(res);
    this.company_info = res;
    this.companyName = res["company"];
    this.Status = res["status"];
    this.Language = res["lang_code"];
    this.Email = res["email"];
    console.log(this.companyName)
  })
}

  back(): void {
    this.location.back()
  }
}
