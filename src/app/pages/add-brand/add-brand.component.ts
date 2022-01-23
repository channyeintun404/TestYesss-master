import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }


}
