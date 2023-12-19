import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
  allregisteredUser: any = [];
  productId:any;

  constructor(
    private route:ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private userService: UserService,
    private postService: PostsService
  ) {}

  ionViewWillEnter() {
 this.user =this.route.snapshot.paramMap.get('id')
   
    this.getAllPosts();
  }

  ngOnInit(): void {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      this.getSingleUser = res.reg.filter(
        (item: any) => item._id === this.user
      );
      console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      console.log(this.filterUser);
    });
  }

  filterPostWithId: any = [];

  getAllPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      console.log(res.allPost);
      this.filterPostWithId = res.allPost.filter(
        (item: any) => item.userId === this.user
      );
      console.log(this.filterPostWithId);
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
    console.log('clicked');
    this.router.navigate(['/follower-following', this.user]);
  }

  followings() {
    console.log('clicked');
    this.router.navigate(['/follower-following', this.user]);
  }

  message(){
    console.log("clicked for message");
    
  }
  tryEmail(){
    console.log("clicked for Email");
    
  }
}
