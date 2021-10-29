import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-vendor-admin',
  templateUrl: './vendor-admin.page.html',
  styleUrls: ['./vendor-admin.page.scss'],
})
export class VendorAdminPage implements OnInit {
  user_id: string;
  company_id: any;
  company_name: any;
  email: any;
  firstname: any;
  status: any;
  phone: any;
  password: any;
  user_info: any;
  profile: any;
  language: any;
  b_address: any;
  b_city: any;
  b_country: any;
  b_firstname: any;
  b_state: any;
  b_zipcode: any;
  birthday: any;
  salt: any;
  s_firstname: any;
  s_phone: any;
  s_address: any;
  s_city: any;
  s_country: any;
  s_state: any;
  s_zipcode: any;

  constructor(private menuController: MenuController,
    private modalController: ModalController,
    private router: Router,
    private location: Location,
    private usersService: UsersService, 
    private cookieService: CookieService) { 
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.user_id = this.cookieService.get('userId');     
    this.email = this.cookieService.get('email'); 
    this.password = this.cookieService.get('password');  
    this.company_id = this.cookieService.get('companyId');
    this.getUserById(this.user_id);
    this.getUserInfoByEmailAndPass(this.email,this.password);
  }

  getUserById(user_id: any) {
    this.usersService.gerUserById(user_id).then((resp: any) => {
      console.log(resp);
      // this.company_id = resp["company_id"];      
      this.company_name = resp["company_name"];    
      this.firstname = resp["firstname"];      
      this.status = resp["status"];          
      this.phone = resp["phone"];
    })    
    // this.getUserInfoByEmailAndPass(this.email,this.password);
  }

  getUserInfoByEmailAndPass(email,pass){
    this.usersService.getUserByEmailAndPassword(email,pass).then( res=>{
      console.log(res);
      this.user_info = res['user_info'];
      this.profile = this.user_info['profile'];
      this.b_address = this.profile['b_address'];
      this.b_city = this.profile['b_city'];
      this.b_country = this.profile['b_country'];
      this.b_firstname = this.profile['b_firstname'];
      this.b_state = this.profile['b_state'];
      this.b_zipcode = this.profile['b_zipcode'];
      this.password = this.profile['password'];
      this.salt = this.profile['salt']
      this.language = this.profile['lang_code'];
      this.phone = this.profile['phone'];
      this.birthday = this.profile['birthday'];
      this.s_firstname = this.profile['s_firstname'];
      this.s_phone = this.profile['s_firstname'];
      this.s_address = this.profile['s_address'];
      this.s_city = this.profile['s_city'];
      this.s_country = this.profile['s_country'];
      this.s_state = this.profile['s_state'];
      this.s_zipcode = this.profile['s_zipcode'];
    })
  }

  saveActivity(){
    console.log(this.birthday)
    this.usersService.updateUser(this.user_id,{
      "company_id": this.company_id,
      "firstname": this.firstname,
      "email" : this.email,
      "b_address": this.b_address,
      "b_city": this.b_city,
      "b_country": this.b_country,
      "b_firstname": this.b_firstname,
      "b_state": this.b_state,
      "b_zipcode": this.b_zipcode,
      "language": this.language,
      "phone": this.phone,
      "birthday": this.birthday,
      "s_firstname": this.s_firstname,
      "s_phone": this.s_phone,
      "s_address": this.s_address,
      "s_city": this.s_city,
      "s_country": this.s_country,
      "s_state": this.s_state,
      "s_zipcode": this.s_zipcode
    })
  }
  // Set Old Password form API to Cookie
  setOldPasswordToCookie(){
    this.cookieService.set('old_password',this.password);
    this.cookieService.set('salt', this.salt);
  }
  clickTab(event: Event, tabPath: string) {
    event.stopImmediatePropagation();
    console.log( event, tabPath );
    this.router.navigate([`${tabPath}`]);
  }
  back() {
    this.router.navigate([`${"tabs/tab5"}`]);
  }



}
