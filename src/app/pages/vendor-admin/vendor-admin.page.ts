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
    this.getUserById(this.user_id);
    this.getUserInfoByEmailAndPass(this.email,this.password);
  }

  getUserById(user_id: any) {
    this.usersService.gerUserById(user_id).then((resp: any) => {
      console.log(resp);
      this.company_id = resp["company_id"];      
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
      this.language = this.profile['lang_code'];
      this.phone = this.profile['phone'];
      this.birthday = this.profile['birthday'];
    })
  }

  saveActivity(){
    console.log(this.birthday)
    this.usersService.updateUser(this.user_id,{
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
      "birthday": this.birthday
    })
  }
  back(): void {
    this.location.back()
  }



}
