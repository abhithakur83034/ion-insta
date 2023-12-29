import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  user: any;
  userId: any;
  allUser: any = [];
  getLoginUser: any;
  filteredUsers: any = [];
  posts: any = [];
  show: boolean[] = [];
  filterlikeBy: any = [];
  showcomments: any;
  token: String = '';

  constructor(
    private router: Router,
    private storage: StorageService,
    private postService: PostsService,
    private userService: UserService,
    private loader: LoaderService
  ) {}

  ionViewWillEnter() {
    console.log('hitted');

    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        // console.log(res);
        this.user = JSON.parse(res.data);
        // console.log(this.user);
        this.token = JSON.parse(res.token);
        console.log(this.token);
        this.getAllUsers();
        this.getAllPosts();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    console.log('clicked');
  }

  getAllPosts() {
    let headers = new HttpHeaders({
      Authorization: `Bearer ` + this.token,
    });

    this.postService.getPosts({ headers: headers }).subscribe((res: any) => {
      console.log(res);

      this.posts = res.allPost;
      console.log(this.posts);

      this.filterlikeBy = this.posts.filter((item: any) =>
        item.likedBy.includes(this.user._id)
      );

      console.log(this.filterlikeBy);

      this.filterlikeBy.forEach((likedReview: any) => {
        const index = this.posts.findIndex(
          (item: any) => item._id === likedReview._id
        );
        if (index !== -1) {
          this.show[index] = true;
        }
      });

      // Extract unique user IDs from posts
      this.userId = this.posts.map((item: any) => item.userId);
    });
  }

  getAllUsers() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      this.allUser = res.reg.filter((item: any) => item._id === this.user._id);
      this.getLoginUser = this.allUser[0];
      console.log(this.getLoginUser);

      if (this.userId) {
        // Filter users who have posted something
        this.filteredUsers = res.reg.filter((user: any) =>
          this.userId.includes(user._id)
        );
      } else {
        // Handle the case where this.userId is undefined
        console.error('this.userId is undefined');
      }
    });
  }

  globalUserId: any = [];

  userExistsInFilteredUsers(userId: string): boolean {
    // console.log('Searching for userId:', userId);

    this.globalUserId = this.filteredUsers.find((u: any) => u._id === userId);

    if (this.globalUserId) {
      // console.log('User found:', this.globalUserId);
    } else {
      // console.log('User not found');
    }

    return !!this.globalUserId;
  }

  showProfile(id: any) {
    this.router.navigate(['/showsingleprofile', id]);
  }

  openChat() {
    // console.log('clicked to chat');
    this.router.navigate(['/chat']);
  }

  togglelike(data: any, index: any) {
    console.log(data);
    console.log(index);
    data.likedBy = this.user._id;
    this.postService.likePost(data).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'liked') {
          this.show[index] = true;
          this.loader.showToast(res.message);
        } else if (res.status === 'disliked') {
          this.show[index] = false;
          this.loader.showToast(res.message);
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

  toggleComments(section: 'showcomments' | 'hidecomments') {
    this.showcomments = section === 'showcomments';
  }
}
