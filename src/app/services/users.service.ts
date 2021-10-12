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
  

  getUserByEmailAndPassword(email,pass) {
    return new Promise((resolve)=>{
      this.getOptionByQueryString('login&user_login='+email+'&password='+pass).subscribe(res=> {
        resolve(res);
      });
    })
  }
  

  }
  