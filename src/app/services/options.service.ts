import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../models/option.model';
@Injectable({
    providedIn: 'root'
  })
  export class OptionsService extends AppService {

    option : Option[]

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('options');
    }
  
    createProductOptions(data:any){
      console.log(data);
      return new Promise((resolve)=>{
        this.createOptions(data).subscribe(res=>{
          // console.log("add res "+JSON.stringify(res));
          resolve(res);
        })
      })
    } 
     
  getOptionsById(id) {
    console.log("id is ="+id)
    return new Promise((resolve)=>{
      this.get(id).subscribe(res=> {
        // console.log("variant are "+JSON.stringify(res['variants']['variant_name']))
      //   const variant_name_array = [];
      //   for (const variant of Object.values(res['variants'])) {
      //     // imagesArr.push(img['detailed']['image_path']);
      //     // console.log("variant are "+variant['variant_name'])
      //     variant_name_array.push(variant['variant_name'])
      //     console.log("variant are "+variant_name_array)
      //   }  

      //  this.option=[];
      //   this.option.push({
      //     option_id : parseInt( res['option_id']),
      //     option_name:  res['option_name'],
      //     product_id:parseInt( res['product_id']),
      //     position: parseInt( res['position']),
      //     status:res['status'],
      //     variant_name:variant_name_array
      //   })
      //   console.log("*****"+JSON.stringify(this.option))
        resolve(res);
      });
    })
  }
  

  deleteOption(id) {
    return new Promise((resolve) => {
      this.delete(id).subscribe(res => {
       });
    });
  }
  
    getProductsOptions(pid) {
      return new Promise((resolve) => {
        this.getOptionByQueryString('options&product_id=' + pid).subscribe(res => {
          // console.log(Object.values(res['option_name']));
          resolve(Object.values(res));
         });
      });
    }

    updateOptions(id: number,data:any){
      return new Promise((resolve)=>{
        this.edit(id,data).subscribe(res=>{
          console.log(res);
        })
      })
    }
  
  }
  