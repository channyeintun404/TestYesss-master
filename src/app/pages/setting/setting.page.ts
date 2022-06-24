import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  setting: string="Y";

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location,
    private cookieService: CookieService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
  }
  back(): void {
    this.location.back()
  }
  clickTab(event: Event, tabPath: string) {
    if(tabPath=="vendor"){
      this.cookieService.delete('setting');
      this.cookieService.set('setting',this.setting);
    }
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
}
