import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.services';
import { UsersService }  from 'src/app/services/users.service';


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
  companyId: any;
  company: any;
  error: string;

  constructor(private cookieService: CookieService,
    private router: Router,
    private vendorsService: VendorsService,
    private usersService: UsersService) { }

  ngOnInit() {}

  checkLogin(){
    this.usersService.getUserByEmailAndPassword(this.email,this.password).then( res=>{
      console.log(res);
      this.user_info = res['user_info'];
      if(this.user_info!=null){
        // this.vendorName = this.user_info.firstname      
        // this.cookieService.set('vendorName',this.vendorName);
        this.userId = this.user_info.user_id;
        this.cookieService.set('userId',this.userId);
        this.companyId = this.user_info.company_id;        
        this.company = this.user_info.company;
        this.cookieService.set('companyId',this.companyId);
        this.cookieService.set('company',this.company);
        this.cookieService.set('password',this.password);
        this.cookieService.set('email',this.email);           
        this.cookieService.set('vendorName',this.vendorName);
        this.router.navigate([`${"/tabs/tab1"}`]);
        console.log(this.user_info);
      }else if(this.email == null || this.password == null){
        this.error = "Please Enter Email and Password!!"
        // this.email = null;
        // this.password = null;
      }
      else{
        this.error = "Email or Password is Invalid!!"
        this.email = null;
        this.password = null;
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
