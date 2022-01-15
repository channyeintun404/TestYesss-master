import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VendorsService } from 'src/app/services/vendors.services';
@Component({
  selector: 'app-vendor-plan',
  templateUrl: './vendor-plan.page.html',
  styleUrls: ['./vendor-plan.page.scss'],
})
export class VendorPlanPage implements OnInit {
  planLists: any[];

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location,
    private vendorServices: VendorsService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.getVendorPlanLists();
  }
  getVendorPlanLists(){
    this.vendorServices.vendorPlanLists().then(res=>{
      this.planLists = []
      console.log(res)
      for(const plan of Object.values(res)){
        console.log(plan)
        this.planLists.push(plan);
      }
    })
  }
  back(): void {
    this.location.back()
  }

}
