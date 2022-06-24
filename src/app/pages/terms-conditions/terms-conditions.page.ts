import { Component, OnInit } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {

  companyId: string;
  company_info: any;
  terms: any;
  setting: string;

  constructor(private location: Location,private vendorsServices: VendorsService, private cookieService: CookieService) { }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId');    
    this.setting = this.cookieService.get('setting');
    this.getVendorsById(this.companyId);
  }

  getVendorsById(id){
    this.vendorsServices.getVendorById(id).then(res=>{
      this.company_info = res["vendors"]["0"];
      this.terms = this.company_info.terms;
    })
  }

  saveActivity(){
    this.vendorsServices.updateVerdor(this.companyId,{
      "terms": this.terms,
     
    })
  }
  back(): void {
    this.location.back()
  }

}
