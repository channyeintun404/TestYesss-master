import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.services';
import { UsersService }  from 'src/app/services/users.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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
  rem_password: boolean;
  login_password: string;
  login_username: string;
  show_login: boolean;
  password_type: string;

  constructor(private cookieService: CookieService,
    private router: Router,
    private vendorsService: VendorsService,
    private usersService: UsersService,
    private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.password_type="password";
    this.getRember();    
    console.log(this.show_login);
  }

  checkLogin(email,password){
    this.usersService.getUserByEmailAndPassword(email,password).then( res=>{
      console.log(res);
      this.user_info = res['user_info'];
      if(this.user_info!=null){
        if(this.user_info.profile.status=="A"){          
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
          if(this.rem_password){
            this.nativeStorage.setItem('rememberAccount', {property: this.email, anotherProperty: this.password})
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
          }
        }else{
          this.error = "This User Account is need to Approve"
        }

      }else if(email == null || password == null){
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

    // this.userId = 14;
    // this.cookieService.set('userId',this.userId);
    // this.companyId = 1;        
    // this.company = "Test CNT";
    // this.cookieService.set('companyId',this.companyId);
    // this.cookieService.set('company',this.company);
    // this.cookieService.set('password',this.password);
    // this.cookieService.set('email',"channyeintun404_v@gmail.com");           
    // this.cookieService.set('vendorName',"CCCC");
    // this.router.navigate([`${"/tabs/tab1"}`]);

  }

  goLogin(){
      this.checkLogin(this.login_username,this.login_password);
  }

  showLogin(){
    this.show_login=true;
    console.log(this.show_login);
  }

  getRember(){
    this.nativeStorage.getItem('rememberAccount')
  .then(
    // data => console.log(data['property'],data['anotherProperty'],),
    data => (this.login_username = data['property'],
            this.login_password = data['anotherProperty']),
    error => console.error(error)
  );
  if(this.login_username!=""){
    this.show_login=false;
  }else{
    this.show_login=true;
  }
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
  

  showPassword(){
    if(this.password_type=="password"){
      this.password_type = "text"
    }
    else{
      this.password_type ="password"
    }
  }

}
