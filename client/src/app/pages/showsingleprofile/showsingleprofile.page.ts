import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FollowfollowingService } from 'src/app/services/followfollowing.service';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-showsingleprofile',
  templateUrl: './showsingleprofile.page.html',
  styleUrls: ['./showsingleprofile.page.scss'],
})
export class ShowsingleprofilePage implements OnInit {
  user: any;
  filterUser: any;
  getSingleUser: any;
  show: any;
  hide: any;
  allfollowingUser: any = [];
  productId:any;
  allRegUsers:any=[];
  paramsUser:any=[];
  // followFollowing:any=[];
  following:any=[];
  token:String =""

  constructor(
    private route:ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private userService: UserService,
    private postService: PostsService,
    private followFollowing: FollowfollowingService
      ) {}

  ionViewWillEnter() {
 this.user =this.route.snapshot.paramMap.get('id')
   console.log(this.user);

   this.storage
   .getFromlocal('user')
   .then((res: any) => {
     // console.log(res);
     this.token = JSON.parse(res.token);
     console.log(this.token);
     this.getAllPosts();
   })
   .catch((error: any) => {
     console.log(error);
   });
   

   this.allFollowingUser();
   this.getFollowing();
   this.getFollowers()
    
  }

  ngOnInit(): void {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      // console.log(res.reg);
      this.allRegUsers = res.reg;
      console.log(this.allRegUsers);
      
      this.getSingleUser = this.allRegUsers.filter(
        (item: any) => item._id === this.user
      );
      console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      console.log(this.filterUser);
    });
  }

  filterPostWithId: any = [];

  getAllPosts() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.token
    });
    this.postService.getPosts({headers:headers}).subscribe((res: any) => {
      console.log(res.allPost);
      this.filterPostWithId = res.allPost.filter((item: any) => item.userId === this.user);
      console.log(this.filterPostWithId);
      let findUserId = this.filterPostWithId.map((item:any)=> item.userId)
console.log(findUserId);

this.paramsUser = this.allRegUsers.filter((item:any) => findUserId.includes(item._id))
console.log(this.paramsUser);

    });
  }

  showSinglePosts(key: any) {
    this.router.navigate(['/showposts', key]);
  }

  showProfile(id: any) {
    this.router.navigate(['/showsingleprofile', id]);
  }

  toggleUsers(section: 'show' | 'hide') {
    this.show = section === 'show';
  }

  
  followers() {
    // console.log('clicked');
    this.router.navigate(['/follower-following', this.user]);
  }

  followings() {
    // console.log('clicked');
    this.router.navigate(['/follower-following', this.user]);
  }

  message(){
    // console.log("clicked for message");
    
  }
  tryEmail(){
    // console.log("clicked for Email");
    
  }



  getFollowing(){
    this.followFollowing.getfollowing().subscribe((res:any)=>{
      console.log(res);  
      let findLogUser = res.filter((item:any)=> item.userId === this.user)
      console.log(findLogUser);
      
      this.following = findLogUser.map((item:any)=> item.following); 
      console.log(this.following);
         
    })
  }

  findFollowerUser:any=[];
  getFollowers(){
    this.followFollowing.getfollowing().subscribe((res:any)=>{
      console.log(res); 
      this.findFollowerUser = res.filter((item:any)=> item.following === this.user)
      console.log(this.findFollowerUser);     
    })
  }



  allFollowingUser(){
    this.userService.getRegiseredUser().subscribe((res:any)=>{
      console.log(res.reg);
      let findNotLogUser = res.reg.filter((item:any)=> item._id !== this.user)
      console.log(findNotLogUser);
      
      this.allfollowingUser = findNotLogUser.filter((item:any) => this.following.includes(item._id))
      console.log(this.allfollowingUser);
      
    })
  }


}
