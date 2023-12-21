import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private nativeStorage: NativeStorage,
    private platForm: Platform
  ) {}

  saveToLocal(key: any, data: any) {
    if (this.platForm.is('cordova')) {
      this.nativeStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }


  getFromlocal(key:any): Promise<any> {
    if (!this.platForm.is('cordova')) {
      return new Promise(async (resolve, reject) => {
        const data =  localStorage.getItem(key);
        // console.log(data);
        resolve(data);
        
      });
    } else {
      return this.nativeStorage.getItem(key).then(
        (data) => data,
        (error: any) => {
          return null;
        }
      );
    }
  }


  removeFromLocal(key:any){
    if(this.platForm.is('cordova')){
this.nativeStorage.remove(key)
    }else{
localStorage.removeItem(key)
    }
  }

  
}
