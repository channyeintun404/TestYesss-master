import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor() { }

  getPages() {
    return [
      {
        title: 'Home',
        url: '/tabs/categories',
        icon: 'home'
      },
      {
        title: 'Categories',
        url: '/tabs/categories',
        icon: 'md-grid'
      },
      {
        title: 'Products',
        url: '/tabs/products',
        icon: 'basket'
      },
      {
        title: 'Campaigns',
        url: '/tabs/tab2',
        icon: 'gift'
      },
      {
        title: 'Orders',
        url: '/tabs/orders',
        icon: 'md-checkmark-circle-outline'
      },
      {
        title: 'Notification',
        url: '/tabs/tab4',
        icon: 'md-notifications-outline'
      },
      {
        title: 'Messages',
        url: '/tabs/tab4',
        icon: 'mail'
      },
      {
        title: 'Account',
        url: '/tabs/tab5',
        icon: 'person'
      }
    ];
  }
}
