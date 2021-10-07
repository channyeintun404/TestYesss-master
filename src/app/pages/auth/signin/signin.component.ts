import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit() {}

  setCookie(){
    this.cookieService.set('vendorId',"12");
    // console.log("cookie");
  }

}
