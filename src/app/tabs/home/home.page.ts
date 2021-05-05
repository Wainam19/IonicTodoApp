import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  IonList,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Item, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist') mylist: IonList;

  constructor(
    private storageService: StorageService,
    private plt: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then((item) => {
      this.newItem = <Item>{};
      this.showToast('Item Added');
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getItem().then((items) => {
      this.items = items;
    });
  }

  updateItem(item: Item) {
    item.title = `Updated: ${item.title}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then((item) => {
      this.showToast('Item Updated!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then((item) => {
      this.showToast('Item Deleted!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000 });
    toast.present();
  }
}
