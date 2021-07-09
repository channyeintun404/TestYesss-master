import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UsergroupsService extends AppService {

  constructor(protected http: HttpClient) {
    super(http);
    this.setModel('usergroups');
  }

  getUserGroups(queryString) {
    return new Promise((resolve) => {
      this.getByQueryString(queryString).subscribe(res=> {
          console.log(res);
      })
    })
  }
}
