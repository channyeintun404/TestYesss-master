import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiscussionsService extends AppService {

  constructor(protected http: HttpClient) {
    super(http);
    this.setModel('discussions');
  }
  createMessage(data:any){
    console.log(data);
    return new Promise((resolve)=>{
      this.create(data).subscribe(res=>{
        // console.log("add res "+JSON.stringify(res));
        resolve(res);
      })
    })
  }
  
}

