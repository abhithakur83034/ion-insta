import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { PostsService } from '../services/posts.service';
import { FollowfollowingService } from '../services/followfollowing.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: any;
  filterUser: any;
  getSingleUser: any = [];
  show: any;
  hide: any;
  allregisteredUser: any = [];
  following: any = [];
  findFollowerUser: any = [];
  registerUser:any=[]

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private userService: UserService,
    private postService: PostsService,
    private followFollowing: FollowfollowingService,
    private loader: LoaderService
  ) {}

  ionViewWillEnter() {
    console.log('hitteddddddd');

    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
        console.log(this.user);
        if (this.user) {
          this.getUser();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    console.log('againe and again');
  }

  getUser() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      this.registerUser = res.reg;
      console.log(this.registerUser );
      console.log(this.user._id);

      this.getSingleUser = this.registerUser .filter((item: any) => {
        console.log('item:', item);
        return item._id === this.user._id;
      });

      console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      console.log(this.filterUser);

      this.followFollowing.getfollowing().subscribe((res: any) => {
        console.log(res);
        let findLogUser = res.filter(
          (item: any) => item.userId === this.filterUser._id
        );
        console.log(findLogUser);

        // get following****************************************************************************
        this.getFollowing()
        // this.following = findLogUser.map((item: any) => item.following);
        // console.log(this.following);

        // get follower**********************************************************
        this.getFollowers();



        this.allRegisteredUsers();
        this.getAllPosts();
      });
    });
  }

  navigateToSettings() {
    // Placeholder logic for Settings
    // console.log('Navigating to Settings');
    this.modalCtrl.dismiss();
    this.router.navigate(['/settings', this.user._id]);
  }

  navigateToSaved() {
    // Placeholder logic for Profile
    // console.log('Navigating to Profile');
    this.modalCtrl.dismiss();
    this.router.navigate(['/saved', this.user._id]);
  }

  navigateToQRCode() {
    // Placeholder logic for Notifications
    this.modalCtrl.dismiss();
    // console.log('Navigating to Notifications');
  }

  navigateToSupervision() {
    // Placeholder logic for Explore
    this.modalCtrl.dismiss();
    // console.log('Navigating to Explore');
  }

  navigateToCloseFriend() {
    // Placeholder logic for Favorites
    // console.log('Navigating to Close Friends');
    this.modalCtrl.dismiss();
    this.router.navigate(['/closefriends', this.user._id]);
  }
  navigateToFavorites() {
    // console.log('Navigating to Favorites');
    this.modalCtrl.dismiss();
  }
  navigateToActivity() {
    // console.log('Navigation To Activity');
    this.modalCtrl.dismiss();
    this.router.navigate(['/youractivity', this.user._id]);
  }
  navigateToArchive() {
    // console.log('Navigation To Archive');
    this.modalCtrl.dismiss();
    this.router.navigate(['/archive', this.user._id]);
  }

  followers() {
    // console.log('clicked');
    this.router.navigate(['/follower-following', this.user._id]);
  }

  followings() {
    // console.log('clicked');
    this.router.navigate(['/follower-following', this.user._id]);
  }

  editProfile() {
    // console.log('clicked');
    this.router.navigate(['/editprofile', this.user._id]);
  }

  shareProfile() {
    // console.log('clicked');
  }

  followUnfollow(data: any) {
    console.log(data);
    this.followFollowing.following(data, this.filterUser._id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'follow') {
          this.loader.showToast(res.message);
          this.getFollowing();
          this.allRegisteredUsers();
        }

        if (res.status === 'unfollow') {
          this.loader.showToast(res.message);
          this.getFollowing();
          this.allRegisteredUsers();
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  getFollowing() {
    this.followFollowing.getfollowing().subscribe((res: any) => {
      console.log(res);
      let findLogUser = res.filter((item: any) => item.userId === this.filterUser._id);
      console.log(findLogUser);

      this.following = findLogUser.map((item: any) => item.following);
      console.log(this.following);
    });
  }

  getFollowers() {
    this.followFollowing.getfollowing().subscribe((res: any) => {
      console.log(res);
      this.findFollowerUser = res.filter(
        (item: any) => item.following === this.filterUser._id
      );
      console.log(this.findFollowerUser);
    });
  }

  allRegisteredUsers() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      let findNotLogUser = this.registerUser .filter(
        (item: any) => item._id !== this.filterUser._id
      );
      console.log(findNotLogUser);
      console.log(this.following);
      
      this.allregisteredUser = findNotLogUser.filter(
        (item: any) => !this.following.includes(item._id)
      );
      console.log(this.allregisteredUser);
    });
  }

  filterPostWithId: any = [];

  getAllPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      // console.log(res.allPost);
      this.filterPostWithId = res.allPost.filter(
        (item: any) => item.userId === this.user._id
      );
      // console.log(this.filterPostWithId);
    });
  }

  showSinglePosts(key: any) {
    this.router.navigate(['/showposts', key]);
  }

  showProfile(id: any) {
    this.router.navigate(['/showsingleprofile', id]);
  }

  logOut() {
    this.storage.removeFromLocal('user');
    this.modalCtrl.dismiss();
    this.router.navigate(['/login']);
  }

  toggleUsers(section: 'show' | 'hide') {
    this.show = section === 'show';
  }
}
