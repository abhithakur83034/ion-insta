import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
user:any

  constructor(private storage:StorageService) {}

  ionViewWillEnter(){
    this.storage.getFromlocal('user').then((res: any) => {
      console.log(res);
      this.user = JSON.parse(res);
      console.log(this.user);
    })
    .catch((error: any) => {
      console.log(error);
    });
  }

}
