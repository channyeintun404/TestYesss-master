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
  Status: string;
  Language: any;
  Email: any;
  companyId: string;
  Address: any;
  City: any;
  Country: any;
  State: any;
  Phone: any;
  Url: any;

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
    console.log(res["vendors"]["0"]);
    this.company_info = res["vendors"]["0"];
    this.companyName = this.company_info.company;
    this.Status = this.company_info.status;
    this.Language =this.company_info.lang_code;
    this.Email = this.company_info.email;
    this.Address = this.company_info.address;
    this.City = this.company_info.city;
    this.Country = this.company_info.country;
    this.State = this.company_info.state;
    this.Phone = this.company_info.phone;
    this.Url = this.company_info.url;
    console.log(this.companyName)
  })
}

  back(): void {
    this.location.back()
  }
}
