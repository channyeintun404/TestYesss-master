/**
 * Landing Page Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 * 
 * File path - 'src/pages/auth/landing-page/landing-page.component.ts'
 */

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private menuController: MenuController,) { }

  ngOnInit() { 
    this.menuController.enable(false);
  }

}
