import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Option } from '../models/option.model';
@Injectable({
    providedIn: 'root'
  })
  export class UsersService extends AppService {

    option : Option[]

  
    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('users');
    }
  
    getUserById(id){
      return new Promise((resolve)=> {
        this.get(id).subscribe(res=>{
          resolve(res);
        },
        err=>{
          resolve(null);
        },()=>{

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

  updateUser(id,data){
    console.log(data);
    return new Promise((resolve)=>{
      this.edit(id,data).subscribe(res=>{
        console.log(res);
      })
    })
  }
  

  }
  