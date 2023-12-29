import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowfollowingService } from 'src/app/services/followfollowing.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follower-following',
  templateUrl: './follower-following.page.html',
  styleUrls: ['./follower-following.page.scss'],
})
export class FollowerFollowingPage implements OnInit {
  user: any;
  filterUser: any;
  getSingleUser: any;
  selectedTab: string = '';
  allregUser: any = [];
follower:any;
following:any;
userIds:any;
follow:any

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private userService: UserService,
    private followFollowing: FollowfollowingService,
    private router:Router
  ) {}

  ionViewWillEnter() {
    console.log('clickrd on ionView');
    this.user = this.route.snapshot.paramMap.get('id')
    console.log(this.user);
    
   
    this.getFollowing();
    this.getFollowers();
  }

  ngOnInit() {
    console.log('Clicked ');
    this.getRegisteredUser();
  }

  getRegisteredUser() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      this.allregUser = res.reg;
      this.getSingleUser = this.allregUser.filter(
        (item: any) => item._id === this.user
      );
      // console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      console.log(this.filterUser);
    });
  }

  followingUser: any = [];
  getFollowing() {
    this.followFollowing.getfollowing().subscribe((res: any) => {
      // console.log(res);
      let filterUsers = res.filter((item: any) => item.userId === this.user);
      console.log(filterUsers);

      let findUser = filterUsers.map((item: any) => item.following);
      console.log(findUser);
      if (this.allregUser) {
        this.followingUser = this.allregUser.filter((item: any) => findUser.includes(item._id));
          console.log(this.followingUser);
      }
    });
  }

  findFollowerUser:any=[];
  Followers:any=[];
  getFollowerss:any=[];
  
  getFollowers(){
    this.followFollowing.getfollowing().subscribe((res:any)=>{
      console.log(res); 
      this.findFollowerUser = res.filter((item:any)=> item.following === this.user)
      console.log(this.findFollowerUser);   
      this.Followers = this.findFollowerUser.map((item:any)=> item.userId)
      console.log(this.Followers);
     
       this.getFollowerss = this.allregUser.filter((item:any)=> this.Followers.includes(item._id))
       console.log(this.getFollowerss);
       
    })
  }

  toggler(section: string): void {
    this.follower = section === 'follower';
    this.following = section === 'following';
  }


  showUserDetils(id:any){
    this.router.navigate(['/showsingleprofile',id])
  }



  followUnfollow(section:'follow'|'unfollow'){
    this.follow = section === 'follow'
    
  }


}
