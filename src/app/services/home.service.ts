import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  homedatalist: any;

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
    this.homedatalist = [
      {
        id: 1,
        order: 1,
        sales: 1500,
        tax: 100,
        active_porduct:true,
        out_of_stock: 1
      },
      {
        id: 2,
        name: "new order is received",
        active:true,
        type: "order",
        item_id:"159",
        description: "order notification",
        date: "03/01/2022"
      },
      {
        id: 3,
        name: "new order is received",
        active: false,
        type: "order",
        item_id:"156",
        description: "",
        date: "06/01/2022"
      },        {
        id: 4,
        name: "new order is received",
        active: true,
        type: "order",
        item_id:"157",
        description: "",
        date: "08/01/2022"
      },  
      {
        id: 5,
        name: "new order is received",
        active: false,
        type: "order",
        item_id:"156",
        description: "",
        date: "08/01/2022"
      },
      {
        id: 6,
        name: "new inquiry message in order",
        active: true,
        type: "order",
        item_id:"156",
        description: " can i message to you?",
        date: "08/01/2022"
      },
      {
        id: 6,
        name: "new inquiry message in order",
        active: true,
        type: "order",
        item_id:"156",
        description: "i received my order",
        date: "08/01/2022"
      },
      {
        id: 7,
        name: "new reviews message in product",
        active: true,
        type: "product",
        item_id:"671",
        description: "good product",
        date: "15/02/2022"
      },
      {
        id: 8,
        name: "new reviews message in product",
        active: true,
        type: "product",
        item_id:"639",
        description: "I really like it.",
        date: "15/02/2022"
      },
      {
        id: 9,
        name: "new Inquery message in product Inquery",
        active: true,
        type: "productInquery",
        item_id:"660",
        description: "Hello product",
        date: "18/02/2022"
      },
      {
        id: 10,
        name: "new Inquery message in product",
        active: true,
        type: "productInquery",
        item_id:"661",
        description: "good product",
        date: "18/02/2022"
      },
      {
        id: 11,
        name: "new Inquery message in product",
        active: true,
        type: "productInquery",
        item_id:"662",
        description: "good product",
        date: "18/02/2022"
      }
      ,
      {
        id: 12,
        name: "new shipment is received",
        active: true,
        type: "shipment",
        item_id:"47",
        description: "shipment notification",
        date: "23/02/2022"
      }
      ,
      {
        id: 13,
        name: "new shipment is received",
        active: true,
        type: "shipment",
        item_id:"46",
        description: "new shipment notification",
        date: "23/02/2022"
      }
      ,
      {
        id: 14,
        name: "new shipment is received",
        active: true,
        type: "shipment",
        item_id:"45",
        description: "notification for shipment",
        date: "24/02/2022"
      }
    ];
    return new Promise((resolve) => {
      resolve(this.homedatalist);
     });
  }

}
