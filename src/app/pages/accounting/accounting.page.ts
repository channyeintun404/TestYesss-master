import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountingService } from 'src/app/services/accounting.service';
import { colorSpace } from '@cloudinary/base/actions/delivery';
@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  accLists: any[];

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location,
    private accountingServic: AccountingService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.getAccountingList();
  }
  getAccountingList(){
    this.accountingServic.accountingLists().then(res=>{
      console.log(res)
      this.accLists=[];
      for(const accounting of Object.values(res)){
        console.log(accounting)
        this.accLists.push(accounting)
      }
      console.log(this.accLists)
    })
  }
  back(): void {
    this.location.back()
  }

}
