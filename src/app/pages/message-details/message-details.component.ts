import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
  firstname: any;
  user_id: string;
  timestamp: any;

  constructor(private router: Router,
    public modalController: ModalController,
    private usersService: UsersService,
    private cookieService: CookieService ) { }

  ngOnInit() {
    this.user_id = this.cookieService.get('userId');
    this.checkMessage();
  }
  checkMessage(){
    this.usersService.getUserById(this.user_id).then(res=>{
      console.log(res["firstname"], res["lastname"]);
      this.firstname = res["firstname"];
      this.timestamp = res["timestamp"]
    })
   
   }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
