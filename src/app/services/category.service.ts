import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Rx from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AppService {

  categories: Category[];
  categoriesByLevel2:Category[];
  categoriesImages: any;
  basicAuthToken: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.setModel('categories');
    this.categoryImages();
  }

  // getCategories() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': this.basicAuthToken
  //     })
  //   };
  //   return new Promise((resolve) => {
  //     this.http.get('http://www.yesss.com.mm/api.php/?_d=categories&items_per_page=0&group_by_level=true&max_nesting_level=1', httpOptions).subscribe((response) => {
  //       // resolve(response);
  //       this.categories = [];
  //       for(const cat of response['categories']) {
  //         this.categories.push({
  //           id: cat['category_id'],
  //           name: cat['category'],
  //           image: "assets/images/category/women-fashion.jpg"
  //         });
  //       }
  //       resolve(this.categories);
  //     });
  //   });
  // }
  getParentCategories() {
    return new Promise((resolve) => {
      this.getByQueryString('items_per_page=0&group_by_level=true&max_nesting_level=1').subscribe(res => {
        // console.log(res);
        this.categories = [];
        let idx = 0;
        for(const cat of res['categories']) {
          this.categories.push({
            id: cat['category_id'],
            parent_id : cat['parent_id'],
            name: cat['category'],
            image: this.categoriesImages[idx]
          });
          if (idx < this.categoriesImages.length - 1) {
            idx++;
          }
        }
        resolve(this.categories);
      });
    });
  }

  getLevel2Categories() {
    return new Promise((resolve) => {
      this.getByQueryString('items_per_page=0&group_by_level=true&max_nesting_level=3').subscribe(res => {
        // console.log(res);
        this.categoriesByLevel2 = [];
        let idx = 0;
        for(const cat of res['categories']) {
          this.categoriesByLevel2.push({
            id: cat['category_id'],
            parent_id : cat['parent_id'],
            name: cat['category'],
            image: this.categoriesImages[idx]
          });
          if (idx < this.categoriesImages.length - 1) {
            idx++;
          }
        }
        resolve(this.categoriesByLevel2);
      });
    });
  }

  categoryImages() {
    this.categoriesImages = [
      "assets/images/category/men-fashion.jpg",
      "assets/images/category/women-fashion.jpg",
      "assets/images/category/baby.jpg",
      "assets/images/category/home.jpg",
      "assets/images/category/luggage.jpg",
      "assets/images/category/watches.jpg",
      "assets/images/category/shoes.jpg",
      "assets/images/category/computer.jpg",
      "assets/images/category/electronics.jpg",
      "assets/images/category/jewelry.jpg"
    ];
  }

  getCategoryById(cid) {
    return new Promise((resolve) => {
      if(cid!=null){
        this.getOptionByQueryString('categories/' + cid).subscribe(res => {
          console.log(res);
          resolve(res);
         });
      }
    });
  }

  categoryList() {
    this.categories = [
      {
        id: 1,
        parent_id:null,
        name: "Women11",
        image: "assets/images/category/women-fashion.jpg"
        
      },
      {
        id: 2,
        parent_id:null,
        name: "Men",
        image: "assets/images/category/men-fashion.jpg"
      },
      {
        id: 3,
        parent_id:null,
        name: "Bags",
        image: "assets/images/category/luggage.jpg"
      },
      {
        id: 4,
        parent_id:null,
        name: "Watches",
        image: "assets/images/category/watches.jpg"
      },
      {
        id: 5,
        parent_id:null,
        name: "Jewelry",
        image: "assets/images/category/jewelry.jpg"
      },
      {
        id: 6,
        parent_id:null,
        name: "Shoes",
        image: "assets/images/category/shoes.jpg"
      },
      {
        id: 7,
        parent_id:null,
        name: "Computer",
        image: "assets/images/category/computer.jpg"
      },
      {
        id: 8,
        parent_id:null,
        name: "Electronics",
        image: "assets/images/category/electronics.jpg"
      },
      {
        id: 9,
        parent_id:null,
        name: "Home",
        image: "assets/images/category/home.jpg"
      },
      {
        id: 10,
        parent_id:null,
        name: "Baby Store",
        image: "assets/images/category/baby.jpg"
      }
    ];

    return this.categories;
  }

}
