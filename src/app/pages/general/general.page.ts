import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  companyName: any;

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location, private vendorsServices: VendorsService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.getVendorsById(1);
  }
getVendorsById(id){
  this.vendorsServices.getVendorById(id).then(res=>{
    console.log(res);
    this.companyName = res["company"];
    console.log(this.companyName)
  })
}

  back(): void {
    this.location.back()
  }
}
