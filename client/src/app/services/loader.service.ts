import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading: any;
  constructor(private toastCtrl:ToastController, private alertCtrl:AlertController, private loadingCtrl:LoadingController) { }

  async showLoading(){
    this.loading = await this.loadingCtrl.create({
      message:"Loading"
    });
    await this.loading.present()
  }

  async dismissLoading(){
    if(this.loading){
      await this.loading.dismiss();
    }
  }


   async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }


  async showToast(message: string, duration: number = 2000, position: any = 'top') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }



}
