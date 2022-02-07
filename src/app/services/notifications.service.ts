import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notification: any;

  constructor() { }

  // getNotifications() {
  //   return [
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: false,
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: false
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: true
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: true
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: true
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: true
  //     },
  //     {
  //       title: "Contrary to popular belief",
  //       message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  //       date: "15/20",
  //       status: true
  //     }
  //   ]
  // }


  getAllNotification(){
    this.notification = [
      {
        id: 1,
        name: "new order is received",
        active: "false",
        type: "order",
        item_id:"160",
        description: "new order",
        date: "01/01/2022"
      },
      {
        id: 2,
        name: "new order is received",
        active: "true",
        type: "order",
        item_id:"159",
        description: "order notification",
        date: "03/01/2022"
      },
      {
        id: 3,
        name: "new order is received",
        active: "false",
        type: "order",
        item_id:"156",
        description: "",
        date: "06/01/2022"
      },        {
        id: 4,
        name: "new order is received",
        active: "true",
        type: "order",
        item_id:"157",
        description: "",
        date: "08/01/2022"
      },  
      {
        id: 5,
        name: "new order is received",
        active: "false",
        type: "order",
        item_id:"156",
        description: "",
        date: "08/01/2022"
      },
      {
        id: 6,
        name: "new inquiry message in order",
        active: "true",
        type: "order",
        item_id:"156",
        description: " can i message to you?",
        date: "08/01/2022"
      },
      {
        id: 6,
        name: "new inquiry message in order",
        active: "true",
        type: "order",
        item_id:"156",
        description: "i received my order",
        date: "08/01/2022"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.notification);
     });
  }

}
