import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent implements OnInit {
  id: any;
  backs: any;
  steps: any;
  checks: any;
  rate: number;
  comment: any;
  name:  any[];
  time:  any[];
  discussions: any[];
  discussionNameArray: any[];

  constructor(public modalController: ModalController,
    private productsService : ProductsService,) { }

  ngOnInit() {
    console.log(this.id)
    this.getDiscussionById(this.id);
  }
  getDiscussionById(id){
    this.rate=0;
    console.log("id is ="+this.id);
    this.productsService.getDiscussionById(this.id).then( res=>{
      console.log(res);
      this.discussions = [];
      this.discussionNameArray = [];
      for (const discussion of Object.values(res['discussions'])){
        console.log(discussion)
        this.discussions.push(discussion)
        // this.discussionNameArray.push(discussion['name'])
        
      }
      console.log(this.discussions.length)
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
