import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
  posts:any=[]

  constructor(
    private router:Router,
    private storage: StorageService,
    private postService: PostsService,
    private userService: UserService
  ) {}

  // ionViewWillEnter() {
   
  // }

  ngOnInit(): void {
    // console.log('clicked');

    this.storage
    .getFromlocal('user')
    .then((res: any) => {
      // console.log(res);
      this.user = JSON.parse(res);
      // console.log(this.user);
    })
    .catch((error: any) => {
      console.log(error);
    });



    this.getAllPosts();
    this.getAllUsers();
  }

  getAllPosts() {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res.allPost;
      console.log(this.posts);
  
      // Extract unique user IDs from posts
      // this.userId = [...new Set(res.allPost.map((item: any) => item.userId))];
      this.userId = res.allPost.map((item: any) => item.userId);
   console.log(this.userId);
   
    });
  }
  
  getAllUsers() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      this.allUser = res.reg.filter((item: any) => item._id === this.user._id);
      this.getLoginUser = this.allUser[0];
  
      if (this.userId) {
        // Filter users who have posted something
        this.filteredUsers = res.reg.filter((user: any) => this.userId.includes(user._id));
        console.log(this.filteredUsers);
       let user =  this.filteredUsers.map((item:any)=> item.name)
       console.log(user);
       
      } else {
        // Handle the case where this.userId is undefined
        console.error("this.userId is undefined");
      }
    });
  }
  
  
  
  // getFilteredPosts(userId: string): any[] {
  //   // Filter posts for a specific user
  //   return this.posts.filter((post: any) => post.userId === userId);
  // }
  

  showProfile(id: any) {
    this.router.navigate(['/showsingleprofile', id]);
  }


}
