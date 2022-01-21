import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../models/option.model';
@Injectable({
    providedIn: 'root'
  })
  export class FeaturesService extends AppService {

    // option : Option[]

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('features');
    }
    getAllFeatures() {
      return new Promise((resolve) => {
        this.getOptionByQueryString('features/18').subscribe(res => {
          console.log(res);
          resolve(res);
         });
      });
    }

    getFeaturesById() {
      return new Promise((resolve) => {
        this.getOptionByQueryString('features/18').subscribe(res => {
          console.log(res);
          resolve(res);
         });
      });
    }
  }
  