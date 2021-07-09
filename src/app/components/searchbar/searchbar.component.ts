import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from '../../pages/search/search.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async gotoSearchPage() {
    const modal = await this.modalController.create({
      component: SearchComponent
    });
    return await modal.present();
  }

}
