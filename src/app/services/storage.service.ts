import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  getStorage(ITEMS_KEY): Promise<Product[]> {
    return this.storage.get(ITEMS_KEY);
  }

  setStorageValue(product: Product, ITEMS_KEY): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      if (items) {
        items.push(product);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [product]);
      }
    });
  }

  updateStorageValue(item: Product, ITEMS_KEY): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let newItems: Product[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  removeStorageValue(id: number, ITEMS_KEY): Promise<Product> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Product[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
