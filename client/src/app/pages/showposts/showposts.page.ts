import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-showposts',
  templateUrl: './showposts.page.html',
  styleUrls: ['./showposts.page.scss'],
})
export class ShowpostsPage implements OnInit {
  productId: any;
  singlePost: any;
  user: any;
  singleUser: any;
  filterSinglePost:any;
  show: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private storage: StorageService,
    private userService: UserService,
    private router:Router,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      let filterUser = res.reg.filter(
        (item: any) => item._id === this.user._id
      );
      this.singleUser = filterUser[0];
    });

    this.postsService.getPosts().subscribe((res: any) => {
      console.log(res.allPost);
      this.filterSinglePost = res.allPost.filter(
        (item: any) => item._id === this.productId
      );
      console.log(this.filterSinglePost);
      // this.singlePost = filterSinglePost[0];
    });
  }

  ngOnInit() {
    console.log('dvnshgsdj');
  }


  gotoProfile(){
    this.router.navigate(['/tabs/tab3'])
  }

  togglelike(data:any, index:any){
 console.log('clicked', index);
 console.log('data', data);
  }


}
