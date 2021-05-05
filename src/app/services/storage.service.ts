import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Item {
  id: number;
  title: string;
  description: string;
  modified: number;
}

const itemKey = 'myItem';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  addItem(item: Item): Promise<any> {
    return this.storage.get(itemKey).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(itemKey, items);
      } else {
        return this.storage.set(itemKey, [item]);
      }
    });
  }

  getItem(): Promise<Item[]> {
    return this.storage.get(itemKey);
  }

  updateItem(item: Item): Promise<any> {
    return this.storage.get(itemKey).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let newItems: Item[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(itemKey, newItems);
    });
  }

  deleteItem(id: number): Promise<Item> {
    return this.storage.get(itemKey).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(itemKey, toKeep);
    });
  }
}
