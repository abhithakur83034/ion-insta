import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follower-following',
  templateUrl: './follower-following.page.html',
  styleUrls: ['./follower-following.page.scss'],
})
export class FollowerFollowingPage implements OnInit {
  user: any;
  filterUser:any;
  getSingleUser:any;selectedTab: string = '';

  constructor(private storage: StorageService, private userService:UserService) { }


  ionViewWillEnter() {
    console.log("clickrd on ionView");
    
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
        console.log(this.user);
        
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  ngOnInit() {
    console.log("Clicked ");
    this.getRegisteredUser()
  }


  getRegisteredUser(){
    this.userService.getRegiseredUser().subscribe((res:any)=>{
      console.log(res.reg);
      this.getSingleUser = res.reg.filter((item:any)=> item._id === this.user._id)
      console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0]
      console.log(this.filterUser);
      
    })
  }

}
