import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { DiscussionsService } from 'src/app/services/discussions.services';
@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
  order_id : any
  firstname: any;
  user_id: string;
  timestamp: any;
  message: any;

  constructor(private router: Router,
    public modalController: ModalController,
    private usersService: UsersService,
    private cookieService: CookieService,
    private discussionsService: DiscussionsService ) { }

  ngOnInit() {
    console.log(this.order_id);
    this.timestamp = new Date().toISOString();
    console.log(this.timestamp);
    this.user_id = this.cookieService.get('userId');
    this.checkMessage();
  }
  checkMessage(){
    this.usersService.getUserById(this.user_id).then(res=>{
      console.log(res["firstname"], res["lastname"]);
      this.firstname = res["firstname"];
    })
   }
    //Create Product
    createMessage(){
      //  console.log(this.firstname, this.user_id, this.message, this.order_id)
      this.discussionsService.createMessage(
        {        
            "name": this.firstname,
            "user_id":this.user_id,
            "message": this.message,
            "object_id": this.order_id,
            "object_type": "O",
            "type": "C"
         }).then((resp: any) => {
           console.log(resp)
        })
        this.dismiss()  
        }   
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
