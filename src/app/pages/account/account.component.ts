import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  vendorName: any;
  company: any;

  constructor(private menuController: MenuController,
    private modalController: ModalController,
    private router: Router,
    private cookieService: CookieService) { 
    this.menuController.enable(true);
  }


  ngOnInit() {
    this.company =  this.cookieService.get('company');
  }

  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
  

  Logout(event: Event, tabPath: string){
    this.cookieService.deleteAll();
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
}
