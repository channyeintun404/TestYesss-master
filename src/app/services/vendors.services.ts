import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../models/option.model';
import { name } from '@cloudinary/base/actions/namedTransformation';
@Injectable({
    providedIn: 'root'
  })
  export class VendorsService extends AppService {

    option : Option[]
  plan: any[];

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('vendors');
    }
  
    createVendor(data:any){
      console.log(data);
      return new Promise((resolve)=>{
        this.create(data).subscribe(res=>{
          resolve(res);
        })
      })
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
  vendorPlanLists(){
    this.plan = [
      {
        id: 1,
        name: "Platinum",
        cost: "FREE/Month",
        products: "50 products",
        income: "Revenue up to Ks100000",
        vendor: "",
        transaction_fee: ""
      },
      {
        id: 2,
        name: "Diamond",
        cost: "FREE/Month",
        products: "150 products",
        income: "Revenue up to Ks500000",
        vendor: "Vendor microstore",
        transaction_fee: "Transaction Fee:15%"
      },
      {
        id: 3,
        name: "Ruby",
        cost: "FREE/Month",
        products: "250 products",
        income: "Revenue up to Ks700000",
        vendor: "Vendor microstore",
        transaction_fee: "Transaction Fee:7%"
      },
      {
        id: 4,
        name: "Exclusive Services",
        cost: "KS5000/Month",
        products: "100 products",
        income: "Revenue up to Ks100000",
        vendor: "Vendor microstore",
        transaction_fee: "Transaction Fee:Ks2000"
      },
      {
        id: 5,
        name: "Premium Services",
        cost: "KS10000/Month",
        products: "150 products",
        income: "Revenue up to Ks1500000",
        vendor: "Vendor microstore",
        transaction_fee: "Transaction Fee:Ks5000"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.plan);
     });
  }
  }
  