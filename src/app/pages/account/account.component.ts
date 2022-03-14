import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VendorsService } from 'src/app/services/vendors.services';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  vendorName: any;
  company: any;
  company_info: any;
  company_logo1: any;
  companyId: string;

  constructor(private menuController: MenuController,
    private modalController: ModalController,
    private router: Router,
    private cookieService: CookieService,private vendorsServices: VendorsService) { 
    this.menuController.enable(true);
  }


  ngOnInit() {
    this.company =  this.cookieService.get('company');
    this.companyId =  this.cookieService.get('companyId');
    this.getVendorsById(this.companyId);
  }

  getVendorsById(id){
    this.vendorsServices.getVendorById(id).then(res=>{
     console.log(res["vendors"]["0"]);
     this.company_info = res["vendors"]["0"];
     this.company_logo1 = this.company_info["logos"]["theme"]["image"]["image_path"];
   })
 }

  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
  
  Logout() {
    if(confirm("Are you sure want to logout!!")) {
      // this.cookieService.deleteAll();
      console.log(this.cookieService.get('companyId'))
      this.router.navigate([`${'./signin'}`]);
    }
  }

  // Logout(event: Event, tabPath: string){
  //   this.cookieService.deleteAll();
  //   event.stopImmediatePropagation();
  //   console.log( event, tabPath );
  //   this.router.navigate([`${tabPath}`]);
  // }
}
