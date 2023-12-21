import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
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

  constructor(
    private userService: UserService,
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('clicked');
  }
  ionViewWillEnter() {
    console.log('kvsnhvasfdjk');
    // this.getAllregisteredUser();
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getPosts().subscribe((res: any) => {
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
      let matchedUsers = res.reg.filter((item: any) =>
        item.name.toLowerCase().includes(val)
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
}
