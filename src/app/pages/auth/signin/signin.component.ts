import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.services';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  email: any;
  password: any;
  user_info: any;
  vendorName: any;
  userId: any;

  constructor(private cookieService: CookieService,
    private router: Router,
    private vendorsService: VendorsService) { }

  ngOnInit() {}

  checkLogin(){
    this.vendorsService.getUserByEmailAndPassword(this.email,this.password).then( res=>{
      console.log(res);
      this.user_info = res['user_info'];
      if(this.user_info!=null){
        this.vendorName = this.user_info.firstname+" "+this.user_info.lastname        
        this.cookieService.set('vendorName',this.vendorName);
        this.userId = this.user_info.user_id;
        this.cookieService.set('userId',this.userId);
        this.router.navigate([`${"/tabs/tab1"}`]);
        console.log(this.user_info);
      }
    })
    
  }

  setCookie(){
    this.cookieService.set('vendorId',"13");
    // console.log("cookie");
  }

  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }

}
