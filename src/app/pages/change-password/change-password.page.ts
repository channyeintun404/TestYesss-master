import { Component, OnInit } from '@angular/core';
import {Md5} from "ts-md5";
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  old_password: any;
  location: any;
  new_password: any;
  confirm_password: any;
  old_pass_api: string;
  old_pass_encrypt: any;
  salt: any;
  salt_encrypt: any;
  old_pass_salt_encrypt: string;
  user_id: string;
  company_id: any;
  old_pass_error: string;
  error: string;
  constructor(private router: Router, private usersService: UsersService,private cookieService: CookieService) { }

  ngOnInit() {
    this.user_id = this.cookieService.get('userId');
    this.company_id = this.cookieService.get('companyId');
    this.old_pass_api= this.cookieService.get('old_password');
    this.salt = this.cookieService.get('salt');
  }
  changePassword() {
      const md5 = new Md5();
      this.old_pass_encrypt = Md5.hashStr (this.old_password) .toString ();
      this.salt_encrypt =  Md5.hashStr (this.salt) .toString ();
      this.old_pass_salt_encrypt = Md5.hashStr(this.old_pass_encrypt + this.salt_encrypt);
      console.log(this.new_password, this.confirm_password)
      if(this.old_pass_api == this.old_pass_salt_encrypt){
        if(this.new_password == null){
          this.error = "Need to check new_password!!"
        }else if(this.confirm_password == null){
          this.error = "Need to check confirm_password!!"
        }else if(this.new_password != this.confirm_password){
          this.error = "New password and confirm password aren't match!!!"
        }else if(this.new_password!="" &&  this.confirm_password!="" && this.new_password == this.confirm_password){
          this.saveChangePass();
          // this.router.navigate([`${"vendor-admin"}`]);
          this.Logout();
        }else{
          this.error = "You need to check new password and confirm password!!"
        }
      }else{
        // console.log('No');
        this.error = "Old Password is invalid!!!"
      }
    }
    saveChangePass(){
      this.usersService.updateUser(this.user_id,{
        "company_id": this.company_id,
        "password": this.new_password
      })
    }
    // Logout
    Logout(){
      this.cookieService.deleteAll();
      this.router.navigate([`${"./"}`]);
    }

    back() {
      this.router.navigate([`${"vendor-admin"}`]);
    }
}
