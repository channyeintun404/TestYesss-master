import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../models/option.model';
@Injectable({
    providedIn: 'root'
  })
  export class VendorsService extends AppService {

    option : Option[]

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('vendors');
    }
  

  getUserByEmailAndPassword(email,pass) {
    return new Promise((resolve)=>{
      this.getOptionByQueryString('login&user_login='+email+'&password='+pass).subscribe(res=> {
        resolve(res);
      });
    })
  }
  getVendorById(id) {
    return new Promise((resolve)=> {
      this.getOptionByQueryString('vendors&extend[logos]=1&extend[placement_info]=1&company_id='+id).subscribe(res=>{
          resolve(res);
        },
        err=>{
          resolve(null);
        },()=>{

        })
    })
  }

  updateVerdor(id,data){
    console.log(data);
    return new Promise((resolve)=>{
      this.edit(id,data).subscribe(res=>{
        console.log(res);
      })
    })
  }

  }
  