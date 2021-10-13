import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-logos',
  templateUrl: './logos.page.html',
  styleUrls: ['./logos.page.scss'],
})
export class LogosPage implements OnInit {

  constructor(private menuController: MenuController,private modalController: ModalController,private router: Router,
    private location: Location) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
  }
  back(): void {
    this.location.back()
  }
}
