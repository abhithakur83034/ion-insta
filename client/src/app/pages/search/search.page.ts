import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  input: any;
  Posts: any = [];
  searchedUser: any;
  user:any;
  token:String =""
  constructor(
    private userService: UserService,
    private postService: PostsService,
    private router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    console.log('clicked');
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        // console.log(res);
        this.user = JSON.parse(res.data);
        console.log(this.user);
        this.token = JSON.parse(res.token);
        console.log(this.token);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  ionViewWillEnter() {
    console.log('kvsnhvasfdjk');
    // this.getAllregisteredUser();
    this.getAllPosts();
  }

  getAllPosts() {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.postService.getPosts({ headers: headers }).subscribe((res: any) => {
      // console.log(res.allPost);
      this.Posts = res.allPost;
      // console.log(this.Posts);
    });
  }

  searchEvent(event: any) {
    this.input = event.target as HTMLInputElement;
    let val = this.input.value.trim().toLowerCase();

    if (val === '') {
      // Handle empty search input if needed
      this.searchedUser = null;
      return;
    }

    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res);
      
      let matchedUsers = res.reg.filter((item: any) =>
        // item.name.toLowerCase().includes(val) || item.username.toLowerCase().includes(val)
        (item.name || item.username).toLowerCase().includes(val)
      );

      if (matchedUsers.length > 0) {
        console.log(matchedUsers);
        this.searchedUser = matchedUsers;
      } else {
        // Handle case where no matching users are found
        // console.log('No matching users found');
        this.searchedUser = [];
      }
    });
  }

  showUserDetils(id: any) {
    console.log(id);
    
    this.router.navigate(['/showsingleprofile', id]);
  }

  showPost(id:any){
    this.router.navigate(['/showposts', id]);
  }
}
