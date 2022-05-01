/**
 * Product Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */


import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { FilterComponent } from '../filter/filter.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { CategoryService } from '../../services/category.service';
// import { name } from '@cloudinary/base/actions/namedTransformation';
import { Category } from 'src/app/models/category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  //get filter data
  // @Input() priceRange: any;
  // @Input() filter: boolean;

  priceRange_lower: any;
  priceRange_upper: any;
  filter: boolean;

  cid: number;
  // List of prodict
  original_products: Product[];
  products: Product[];
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;
  companyId: string;

    // Check is product available or not
    isProductAvailable: boolean = false;
    categories: Category[];
  name: any;


  constructor(private route: ActivatedRoute,
    private productsService: ProductsService,
    public modalController: ModalController,
    private categoryService: CategoryService, 
    private cookieService: CookieService) {
      
     }

  async ngOnInit() {     
   this.companyId =  this.cookieService.get('companyId'); 
        this.route.params.subscribe(params => {
          this.cid = params['cid'];
          this.priceRange_lower = params['lower'];
          this.priceRange_upper = params['upper']
          });
    await this.getProductList();
    await this.getCategories();
  }

  // Get List of Products
  getProductList() {    
    // this.products = this.productsService.productList();
    this.productsService.getProducts(this.cid,this.companyId).then((resp: any) => {
      console.log(resp);
      this.products = resp
      this.original_products = this.products;
      
      //filter data
      if(this.priceRange_upper!=null){
      this.products = this.products.filter((products)=>{
        return products.price > this.priceRange_lower && products.price < this.priceRange_upper
      })
    this.priceRange_upper=null} 
    });
  }

  // Go to product details page
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    return await modal.present();
  }

  // Open Filter page
  async openFilterPage() {
    const modal = await this.modalController.create({
      component: FilterComponent,
    });
    return await modal.present();
  }

  // Open Add Product page
  async openCheckoutPage() {
    const modal = await this.modalController.create({
      component: CheckoutComponent
    });
    return await modal.present();
  }

  // One column view function
  showOneColumn() {
    this.oneColumn = true;
    this.grid = false
    this.list = false;
  }

  // Grid view function
  showGrid() {
    this.grid = true;
    this.oneColumn = false;
    this.list = false;
  }

  // List view function
  showList() {
    this.list = true;
    this.grid = false;
    this.oneColumn = false;
  }

  //resetData
  resetPage(){
    this.getProductList()
    this.priceRange_upper=null;
  }

  refreshPage(event){
    this.getProductList();
    this.priceRange_upper=null;
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  getCategories() {
    this.categoryService.getCategoryById(this.cid).then((resp: any) => {
      console.log(resp);
      this.name = resp['category']
      // console.log(resp['category'])
    });
  }
  
  // Get Search Result
  getProducts(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the product
    if (val && val.trim() != '') {
      this.isProductAvailable = true;
      this.products = this.original_products.filter((products)=>{
        return products.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }

}
