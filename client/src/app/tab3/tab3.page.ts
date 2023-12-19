import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: any;
  filterUser: any;
  getSingleUser: any;
  show: any;
  hide: any;
  allregisteredUser: any = [];

  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private router: Router,
    private userService: UserService,
    private postService: PostsService
  ) {}

  ionViewWillEnter() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      // console.log(res.reg);
      this.allregisteredUser = res.reg.filter(
        (item: any) => item._id !== this.user._id
      );
    });

    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.getAllPosts();
  }

  ngOnInit(): void {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      // console.log(res.reg);
      this.getSingleUser = res.reg.filter(
        (item: any) => item._id === this.user._id
      );
      // console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      // console.log(this.filterUser);
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
