import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {

  products: Product[];
  companyId: string;

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  constructor(private productsService: ProductsService,
    private modalController: ModalController, 
    private cookieService: CookieService) { }

  ngOnInit() {
    this.companyId =  this.cookieService.get('companyId'); 
    this.getProductList();
  }

  getProductList() {
    this.productsService.getProducts("",this.companyId).then((resp: any) => {
      console.log(resp);
      this.products = resp
    });
  }

  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    return await modal.present();
  }

}
