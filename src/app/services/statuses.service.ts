import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Status } from '../models/status.modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class StatusesService extends AppService {
    statuses : Status[];

    constructor(protected http: HttpClient) {
      super(http);
      this.setModel('statuses');
    }
        getStatuses(){
          this.statuses= [];
          return new Promise((resolve) => {
            this.getAll(1,20).subscribe(res=>{
              console.log(res);
                  for(const status of res["statuses"]){
                      this.statuses.push({
                        id: status["status_id"],
                        status: status["status"],
                        type: status["type"],
                        is_default: status["is_default"]==="Y"?true:false,
                        position: status["position"],
                        description: status["description"],
                        email_subj: status["email_subj"],
                        email_header: status["email_header"],
                    });
                  }
            },
            err=>{
              console.log("Status List ERROR");
            },()=>{
              resolve(this.statuses);
            })
          })
        }
  }
