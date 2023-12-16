import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: any;
  filterUser:any;
  getSingleUser:any;

  constructor(private modalCtrl:ModalController,private storage: StorageService, private router: Router, private userService:UserService) {}

  ionViewWillEnter() {
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

ngOnInit(): void {
  this.userService.getRegiseredUser().subscribe((res:any)=>{
    console.log(res.reg);
    this.getSingleUser = res.reg.filter((item:any)=> item._id === this.user._id)
    console.log(this.getSingleUser);
    this.filterUser = this.getSingleUser[0]
    console.log(this.filterUser);
    
    
  })
}
navigateToSettings() {
  // Placeholder logic for Settings
  console.log('Navigating to Settings');
}

navigateToSaved() {
  // Placeholder logic for Profile
  console.log('Navigating to Profile');
}

navigateToQRCode() {
  // Placeholder logic for Notifications
  console.log('Navigating to Notifications');
}

navigateToMessages() {
  // Placeholder logic for Messages
  console.log('Navigating to Messages');
}

navigateToSupervision() {
  // Placeholder logic for Explore
  console.log('Navigating to Explore');
}

navigateToCloseFriend() {
  // Placeholder logic for Favorites
  console.log('Navigating to Close Friends');
}
navigateToFavorites(){
  console.log('Navigating to Favorites');
}
navigateToActivity(){
  console.log("Navigation To Activity");
  
}
navigateToArchive(){
  console.log("Navigation To Archive");
  
}

followers(){
  console.log("clicked");
}

followings(){
  console.log("clicked");
}

editProfile(){
  console.log("clicked");
  
}


shareProfile(){
  console.log("clicked");
  
}

  logOut() {
    this.storage.removeFromLocal('user');
    this.modalCtrl.dismiss()
    this.router.navigate(['/login']);
  }
}
