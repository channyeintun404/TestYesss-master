import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
  error: string="";
  
  constructor(
    private usersService: UsersService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {}

  register(){

    if(this.firstname==null){
      this.error = "Please Enter Name!!"
    }else if(this.email==null) {
      this.error = "Please Enter Email!!"
    }else if(this.phone==null){
     this.error = "Please Enter PhoneNumber!!"
    }else if(this.password==null){
      this.error = "Please Enter Password!!"
    }else{
      console.log("Good")
    }
    // this.usersService.createUser({        
    //   "email": this.email,        
    //   "user_type": "V",
    //   "company_id": 0,
    //   "status": "A",
    //   "firstname":this.firstname,      
    //   "phone":this.phone,
    //   "password":this.password
    //  }).then((resp: any) => {
     
    //   this.newUserId= resp["user_id"];
    //   console.log(this.newUserId);
    //   this.cookieService.set('userId',this.newUserId);
    //   this.router.navigate([`${"/tabs/tab1"}`]);
    // })
  }

     //Create Product
    //  createProduct(){
    //   //  console.log("image url is "+ this.mainImagesURl)
    //   this.productService.createProduct(
    //     {        
    //       "product": this.productName,        
    //       "product_code": this.productCode,
    //       "amount": this.product_amount,
    //       "category_ids":this.category_ids,
    //       "full_description": this.productDescription,
    //       "price":parseInt(this.productPrice),
    //       "list_price":parseInt(this.list_price),
    //       "status": this.status,
    //       "company_id": this.companyId,        
    //       "main_category": 275,
    //       "discountPrice": 50000,
    //       "details_layout": "default",
    //       "min_qty":0,
    //       "quantity": 1,
    //       "isWishlist": true
    //      }).then((resp: any) => {
         
    //       this.newProductId= resp
    //       // // if(this.productName==null){
    //       // //   this.error = "Please Enter Name of Product!!"
    //       // // }
    //       // this.createProductSizeOptions();
    //       // this.createProductColorOptions();
    //     })
    //     this.imagesArrayforView.push('1.jpg')
    //     this.isOption=true;
    //     this.getProductOptions(); 
    //     }   

}
