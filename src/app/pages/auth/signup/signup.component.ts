import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { VendorsService } from 'src/app/services/vendors.services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StatesService } from 'src/app/services/states.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  
  newUserId: any;
  email: string;
  firstname: string;
  phone : number;
  password : string;
  company : string;
  address : string;
  city: string;
  state_code : string;
  city_code : string;  
  township : string;
  new_company_id : number;
  error: string="";
  statesLists: any[];
  city_Lists: any[];
  townships_Lists: any[];
  showcity: boolean = false;
  showtownship: boolean = false;
  password_type :string ="password";
  
  constructor(
    private usersService: UsersService,
    private vendorsService: VendorsService,
    private cookieService: CookieService,
    private statesService: StatesService,
    private router: Router) { }

  ngOnInit() {  
    this.cookieService.deleteAll();
    this.getAllState();
    this.getAllCity();
    this.getAllTownship();
    
  }

  register(){

    if(this.firstname==null|| this.firstname ==""){
      this.error = "Please Enter Name!!"
    }
    else if(this.company==null || this.company=="") {
      this.error = "Please Enter Company!!"
    }
    else if(this.email==null || this.email=="") {
      this.error = "Please Enter Email!!"
    }
    else if(this.phone==null){
     this.error = "Please Enter PhoneNumber!!"
    }
    else if(this.address==null || this.address=="") {
      this.error = "Please Enter Address!!"
    }
    else if(this.state_code==null || this.state_code=="") {
      this.error = "Please Choose State!!"
    } 
    else if(this.city_code==null || this.city=="") {
      this.error = "Please Enter City!!"
    }
    else if(this.password==null || this.password==""){
      this.error = "Please Enter Password!!"
    }
    else{ 
        this.createVendor();
    }   
  }
  
  createVendor(){
    this.vendorsService.createVendor({
      "company": this.company,        
      "storefront": "api",
      "email": this.email,
      "phone": this.phone,
      "address":this.address,      
      "city":this.city_code,
      "country":"Myanmar",
      "state" : this.state_code,
      "zipcode": this.township,
      "status":"N"
    }).then((resp: any) => {
      this.new_company_id = resp["company_id"];
      this.createVendorAccount(this.new_company_id);     
    })
  }

  createVendorAccount(company_id){
    this.usersService.createUser({        
      "email": this.email,        
      "user_type": "V",
      "company_id": company_id,
      "status": "H",
      "firstname":this.firstname,      
      "phone":this.phone,
      "password":this.password,
      "company" : this.company,
      "company_name" : this.company
     }).then((resp: any) => {
      this.router.navigate([`${'./user-create-successful'}`]);
      // this.newUserId= resp["user_id"];
      // console.log(this.newUserId);
      // this.cookieService.set('userId',this.newUserId);
      // this.cookieService.set('companyId',company_id);
      // this.cookieService.set('company',this.company);
      // this.cookieService.set('password',this.password);
      // this.cookieService.set('email',this.email);           
      // this.cookieService.set('vendorName',this.company);
      // this.router.navigate([`${"/tabs/tab1"}`]);
    })
  }

  getAllState(){
    this.statesService.getAllState().then(res=>{
      console.log(res)
      this.statesLists = []
      for(const state of Object.values(res)){
        this.statesLists.push(state);
      }
      
    })
  }

  getAllCity(){
    this.statesService.getAllCity().then(res=>{
      console.log(res)
      this.city_Lists = []
      for(const city of Object.values(res)){
        this.city_Lists.push(city);
      }
      
    })
  }

  getAllTownship(){
    this.statesService.getAllTownship().then(res=>{
      console.log(res)
      this.townships_Lists = []
      for(const township of Object.values(res)){
        this.townships_Lists.push(township);
      }
      
    })
  }

  ClickState(){
    this.showcity = true
  }

  ClickCity(){
    this.showtownship= true;
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
