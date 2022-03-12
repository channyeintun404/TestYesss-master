/**
 * Onbroading Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 * 
 * File path - 'src/pages/onboarding/onboarding.component.ts'
 */

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };


  constructor(private menuController: MenuController,
    private cookieService: CookieService) { }

  ngOnInit() { 
    this.menuController.enable(false);
    this.cookieService.deleteAll();
  }
}
